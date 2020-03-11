import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';


@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity>{
    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {
        super(userRepo)
    }
}
