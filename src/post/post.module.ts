import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaService } from '../prisma/prisma.service';
import { PostController } from './post.controller';

@Module({
  providers: [PostService, PrismaService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
