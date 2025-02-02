import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput) {
    return this.userService.createUser(data);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('select')
  async getUsersSelect() {
    return this.userService.getUsersSelect();
  }

  // @Get(':id')
  // async getUserById(@Param('id') id: number) {
  //   return this.userService.getUserById(id);
  // }

  // @Put(':id')
  // async updateUser(
  //   @Param('id') id: number,
  //   @Body() data: Prisma.UserUpdateInput,
  // ) {
  //   return this.userService.updateUser(id, data);
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: number) {
  //   return this.userService.deleteUser(id);
  // }
}
