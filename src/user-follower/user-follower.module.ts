import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollowerEntity } from './user-follower.entity';
import { UserFollowerController } from './user-follower.controller';
import { UserFollowerService } from './user-follower.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserFollowerEntity])],
    controllers: [UserFollowerController],
    providers: [UserFollowerService]
})
export class UserFollowerModule { }
