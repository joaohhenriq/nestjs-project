import { Injectable } from '@nestjs/common';

import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { LikeEntity } from './like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService extends TypeOrmCrudService<LikeEntity> {
    constructor(@InjectRepository(LikeEntity) private readonly likeRepo: Repository<LikeEntity>) {
        super(likeRepo)
    }
}
