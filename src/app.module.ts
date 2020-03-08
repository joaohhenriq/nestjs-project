import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/post.entity';
import { CommentModule } from './comment/comment.module';
import { CommentEntity } from './comment/comment.entity';
import { LikeModule } from './like/like.module';
import { LikeEntity } from './like/like.entity';
import { UserFollowerModule } from './user-follower/user-follower.module';
import { UserFollowerEntity } from './user-follower/user-follower.entity';

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DB,
      entities: [
        UserEntity,
        PostEntity,
        CommentEntity,
        LikeEntity,
        UserFollowerEntity
      ],
      synchronize: process.env.ENV === 'DEV',
    }),
    UserModule,
    PostModule,
    CommentModule,
    LikeModule,
    UserFollowerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
