import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
// import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { ComplaintModule } from './complaint/complaint.module';
import { EnvModule } from './env/env.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    CategoryModule,
    ComplaintModule,
    EnvModule,
    SharedModule,
    // PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
