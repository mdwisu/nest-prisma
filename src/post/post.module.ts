import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
