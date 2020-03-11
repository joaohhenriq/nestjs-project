import { Injectable } from '@nestjs/common';
import { UserFollowerEntity } from './user-follower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserFollowerService extends TypeOrmCrudService<UserFollowerEntity> {
    constructor(@InjectRepository(UserFollowerEntity) private readonly likeRepo: Repository<UserFollowerEntity>) {
        super(likeRepo)
    }
}
