import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity, Roles } from './user/user.entity';
import { Seed } from './seed.class';

@Injectable()
export class AppService extends Seed {

  constructor(entityManager: EntityManager) {
    super(entityManager)
    this.fakeIt(UserEntity)
    // this.entityManager.save<UserEntity, Partial<UserEntity>>(UserEntity, [{
    //   about: 'about',
    //   name: 'john',
    //   role: Roles.user,
    //   email: 'test@a.com'
    // }]).then((data: Array<Partial<UserEntity>>) => {
    //   console.log(data);
    // }).catch(console.error)
  }

  getHello(): string {
    return 'Hello World!';
  }
}
