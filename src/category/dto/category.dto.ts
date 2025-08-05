import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Road Issue' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Problems related to road damage, potholes, etc.' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Updated Name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Updated Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
