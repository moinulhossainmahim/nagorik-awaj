import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ComplaintStatus } from '@prisma/client';

export class CreateComplaintDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEnum(ComplaintStatus)
  @IsOptional()
  status?: ComplaintStatus;

  @IsString()
  categoryId: string;

  @IsString()
  divisionId: string;

  @IsString()
  districtId: string;

  @IsString()
  upazilaId: string;

  @IsString()
  unionId: string;
}
