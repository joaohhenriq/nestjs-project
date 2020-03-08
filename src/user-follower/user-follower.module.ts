import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollowerEntity } from './user-follower.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserFollowerEntity])]
})
export class UserFollowerModule { }
