import { Module } from '@nestjs/common';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/shared/supabase.service';

@Module({
  controllers: [ComplaintController],
  providers: [ComplaintService, PrismaService, SupabaseService],
})
export class ComplaintModule {}
