import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { EnvService } from '../env/env.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(
    private readonly prisma: PrismaService,
    private readonly envService: EnvService,
  ) {
    this.supabase = createClient(
      this.envService.get<string>('SUPABASE_URL')!,
      this.envService.get<string>('SUPABASE_ANON_KEY')!,
    );
  }

  async register(registrationDto: RegisterDto) {
    try {
      // 1. Check if user exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: registrationDto.email },
      });
      if (existingUser) {
        throw new HttpException(
          'Email already exists.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const userId = uuidv4();

      const { data, error } = await this.supabase.auth.signUp({
        email: registrationDto.email,
        password: registrationDto.password,
        options: {
          data: {
            _id: userId,
          },
        },
      });

      if (error || !data.user) {
        throw new HttpException(
          error?.message || 'Signup failed',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.prisma.user.create({
        data: {
          id: userId,
          authId: data.user.id,
          email: registrationDto.email,
          name: registrationDto.name,
          role: registrationDto.role ?? 'citizen',
          divisionId: registrationDto.divisionId,
          districtId: registrationDto.districtId,
          upazilaId: registrationDto.upazilaId,
          unionId: registrationDto.unionId,
        },
      });

      const session = data.session;

      return {
        auth: {
          accessToken: session?.access_token,
          refreshToken: session?.refresh_token,
          expiresAt: session?.expires_at,
          expiresIn: session?.expires_in,
        },
        user,
      };
    } catch (e) {
      if (e instanceof HttpException) throw e;
    }
  }

  async login(dto: LoginDto) {
    try {
      const authUserInfo = await this.validateUserPassword(dto);

      const user = await this.prisma.user.findUnique({
        where: { authId: authUserInfo.user.id },
      });

      if (!user) {
        throw {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
      }

      const session = authUserInfo.session;

      return {
        auth: {
          jwt: session.access_token,
          refreshToken: session.refresh_token,
          expiresIn: session.expires_in,
          expiresAt: session.expires_at,
        },
        user,
      };
    } catch (e) {
      console.log(e);
    }
  }

  private async validateUserPassword(
    loginInput: LoginDto,
    isPasswordSet?: boolean,
  ) {
    const isEmail = loginInput.email.includes('@');
    const signInPayload: any = {
      password: loginInput.password,
    };

    if (isEmail) {
      signInPayload.email = loginInput.email;
    }

    const { data, error } =
      await this.supabase.auth.signInWithPassword(signInPayload);

    if (error) {
      if (error.code === 'email_not_confirmed') {
        throw {
          status: HttpStatus.FORBIDDEN,
          message: error.message,
          isEmailConfirmed: false,
        };
      }
      if (isPasswordSet) {
        throw {
          status: HttpStatus.FORBIDDEN,
          message: 'Current password is not matching!',
        };
      }
      throw {
        status: error.status || HttpStatus.UNAUTHORIZED,
        message: error.message,
      };
    }
    return data;
  }
}
