import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity, Roles } from './user/user.entity';
import { Seed } from './seed.class';
import { PostEntity } from './post/post.entity';

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
    this.fakeIt(PostEntity)
  }
}
