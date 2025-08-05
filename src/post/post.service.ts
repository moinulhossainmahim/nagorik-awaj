// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { CreatePostDto } from './dto/create-post.dto';

// @Injectable()
// export class PostService {
//   constructor(private readonly prisma: PrismaService) {}

//   async getAllPosts() {
//     return this.prisma.post.findMany();
//   }

//   async createPost(data: CreatePostDto) {
//     return this.prisma.post.create({ data });
//   }
// }
