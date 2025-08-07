import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { SupabaseService } from 'src/shared/supabase.service';

@Injectable()
export class ComplaintService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async uploadImages(images: string[]): Promise<string[]> {
    const urls: string[] = [];

    for (const base64 of images) {
      const url = await this.supabaseService.uploadImage(base64);
      if (url) {
        urls.push(url);
      }
    }

    return urls;
  }

  async create(dto: CreateComplaintDto, images: Express.Multer.File[]) {
    const imageUrls: string[] = [];

    for (const file of images) {
      const base64: string = file.buffer.toString('base64');
      const url = await this.supabaseService.uploadImage(base64);
      if (url) {
        imageUrls.push(url);
      }
    }

    return this.prisma.complaint.create({
      data: {
        ...dto,
        status: dto.status || 'PENDING',
        images: imageUrls,
      },
    });
  }

  async findAll() {
    return this.prisma.complaint.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        division: true,
        district: true,
        upazila: true,
        union: true,
      },
    });
  }
}
