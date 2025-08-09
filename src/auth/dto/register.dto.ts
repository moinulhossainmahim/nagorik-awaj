import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export enum RoleEnum {
  citizen = 'citizen',
  admin = 'admin',
  super_admin = 'super_admin',
}

export class RegisterDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty({ message: 'Email must not be empty.' })
  @MaxLength(60, { message: 'Email must be 60 characters or fewer.' })
  email: string;

  @IsString()
  @Length(8, 100, { message: 'Password must be at least 8 characters long.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Name must not be empty.' })
  @MaxLength(100, { message: 'Name must be 100 characters or fewer.' })
  name: string;

  @IsEnum(RoleEnum)
  @IsOptional()
  role?: RoleEnum = RoleEnum.citizen;

  @IsString()
  @IsOptional()
  divisionId?: string;

  @IsString()
  @IsOptional()
  districtId?: string;

  @IsString()
  @IsOptional()
  upazilaId?: string;

  @IsString()
  @IsOptional()
  unionId?: string;
}
