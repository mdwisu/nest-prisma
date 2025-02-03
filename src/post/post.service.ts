import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async createPostForUser(
    authorId: number,
    postData: {
      title: string;
      content: string;
      categories: { name: string }[];
    },
  ) {
    const post = await this.prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        author: {
          connect: { id: authorId }, // Menghubungkan post ke user yang sudah ada
        },
        categories: {
          connectOrCreate: postData.categories.map((category) => ({
            where: { name: category.name }, // Jika kategori sudah ada, maka hubungkan
            create: { name: category.name }, // Jika kategori belum ada, buat baru
          })),
        },
      },
      include: {
        categories: true, // Menampilkan data kategori dalam response
      },
    });
    return post;
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async updatePostByUser(userId: number, data: any) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        posts: {
          update: {
            where: {
              id: data.id,
            },
            data: {
              title: data.title,
              content: data.content,
            },
          },
        },
      },
      include: {
        posts: true,
      },
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
