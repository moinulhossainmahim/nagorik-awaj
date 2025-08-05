// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { PostService } from './post.service';
// import { CreatePostDto } from './dto/create-post.dto';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { Post as PostModel } from '@prisma/client';

// @ApiTags('Posts')
// @Controller('post')
// export class PostController {
//   constructor(private readonly postService: PostService) {}

//   @Get()
//   @ApiOperation({ summary: 'Get all posts' })
//   @ApiResponse({
//     status: 200,
//     description: 'List of posts',
//     type: [CreatePostDto],
//   })
//   async getPosts(): Promise<PostModel[]> {
//     return this.postService.getAllPosts();
//   }

//   @Post()
//   @ApiOperation({ summary: 'Create a new post' })
//   @ApiResponse({
//     status: 201,
//     description: 'The created post',
//     type: CreatePostDto,
//   })
//   async createPost(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
//     return this.postService.createPost(createPostDto);
//   }
// }
