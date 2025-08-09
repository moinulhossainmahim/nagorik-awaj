import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './category/category.module';
import { ComplaintModule } from './complaint/complaint.module';
import { EnvModule } from './env/env.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CategoryModule, ComplaintModule, EnvModule, SharedModule, AuthModule],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
