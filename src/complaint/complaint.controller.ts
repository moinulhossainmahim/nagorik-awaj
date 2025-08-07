import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ComplaintService } from './complaint.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Complaint')
@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Complaint creation form with optional image uploads',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Street light broken' },
        description: {
          type: 'string',
          example: 'The light near my house is not working.',
        },
        notes: { type: 'string', example: 'Happening for 3 days' },
        status: {
          type: 'string',
          enum: ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'],
          example: 'PENDING',
        },
        categoryId: { type: 'string', example: 'uuid-category' },
        divisionId: { type: 'string', example: 'uuid-division' },
        districtId: { type: 'string', example: 'uuid-district' },
        upazilaId: { type: 'string', example: 'uuid-upazila' },
        unionId: { type: 'string', example: 'uuid-union' },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      required: [
        'title',
        'description',
        'categoryId',
        'divisionId',
        'districtId',
        'upazilaId',
        'unionId',
      ],
    },
  })
  @ApiOperation({ summary: 'Create a new complaint' })
  async create(
    @Body() dto: CreateComplaintDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    return this.complaintService.create(dto, files?.images || []);
  }

  @Get()
  @ApiOperation({ summary: 'Get all complaints' })
  async findAll() {
    return this.complaintService.findAll();
  }
}
