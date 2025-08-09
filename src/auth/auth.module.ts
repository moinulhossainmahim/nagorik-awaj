import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseService } from 'src/shared/supabase.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SupabaseService],
})
export class AuthModule {}
