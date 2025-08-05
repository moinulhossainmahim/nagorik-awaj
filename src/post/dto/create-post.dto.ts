import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'Title of the post' })
  title: string;

  @ApiPropertyOptional({ description: 'Content of the post' })
  content?: string;

  @ApiPropertyOptional({ description: 'Publish status', default: false })
  published?: boolean;
}
