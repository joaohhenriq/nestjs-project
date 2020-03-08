import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './like.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LikeEntity])]
})
export class LikeModule { }
