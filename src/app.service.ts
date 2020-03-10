import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity, Roles } from './user/user.entity';
import { Seed } from './seed.class';
import { PostEntity } from './post/post.entity';
import { CommentEntity } from './comment/comment.entity';
import { LikeEntity } from './like/like.entity';

@Injectable()
export class AppService extends Seed {

  constructor(entityManager: EntityManager) {
    super(entityManager)
    this.fakeData()
  }

  getHello(): string {
    return 'Hello World!';
  }

  private async fakeData(): Promise<void> {
    await this.fakeIt(UserEntity)
    await this.fakeIt(PostEntity)
    await this.fakeIt(CommentEntity)
    await this.fakeIt(LikeEntity)
  }
}
