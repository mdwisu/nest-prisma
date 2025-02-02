import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create-post-connect-user')
  async createPostConnectUser(@Body() data: any) {
    console.log(data);
    return this.postService.createPostForUser(data.authorId, data.postData);
  }
}
