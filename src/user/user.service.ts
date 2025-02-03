import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        posts: {
          include: {
            categories: true,
          },
        },
      },
    });
  }

  async getUsersSelect(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        posts: {
          select: {
            title: true,
            content: true,
            categories: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async getUserByName(name: string): Promise<User[] | null> {
    return this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async createOneUser(email: string, name: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    return user;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
