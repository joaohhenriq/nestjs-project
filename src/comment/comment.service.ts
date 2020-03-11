import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class CommentService extends TypeOrmCrudService<CommentEntity> {
    constructor(@InjectRepository(CommentEntity) private readonly commentRepo: Repository<CommentEntity>) {
        super(commentRepo)
    }
}
