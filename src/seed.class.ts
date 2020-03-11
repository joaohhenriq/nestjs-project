import { EntityManager } from "typeorm";
import { UserEntity, Roles } from "./user/user.entity";
import { internet, name, random, lorem } from 'faker'
import { PostEntity } from "./post/post.entity";
import { CommentEntity } from "./comment/comment.entity";
import { LikeEntity, Type } from "./like/like.entity";
import { UserFollowerEntity, Status } from "./user-follower/user-follower.entity";
import * as dotenv from 'dotenv'

dotenv.config()

export class Seed {
    private users: Array<Partial<UserEntity>>
    private posts: Array<Partial<PostEntity>>

    constructor(private readonly entityManager: EntityManager) {
        this.users = [],
            this.posts = []
    }

    async fakeIt<T>(entity: any): Promise<void> {
        switch (entity) {
            case UserEntity:
                return this.addData(this.userData(), entity, (data: Array<Partial<UserEntity>>) => this.users = data)
                break;
            case PostEntity:
                return this.addData(this.postData(), entity, (data: Array<Partial<PostEntity>>) => this.posts = data)
            case CommentEntity:
                return this.addData(this.commentData(), entity)
            case LikeEntity:
                return this.addData(this.likeData(), entity)
            case UserFollowerEntity:
                return this.addData(this.followData(), entity)
        }
    }

    private userData(): Array<Partial<UserEntity>> {
        return Array.from({ length: +process.env.SEED_NUM || 100 })
            .map<Partial<UserEntity>>(() => {
                return {
                    email: internet.email(),
                    name: `${name.firstName()} ${name.lastName()}`,
                    role: random.arrayElement([...Array.from({ length: 5 }).fill(Roles.user), Roles.admin]), // cria um array com role user para garantir que caia mais dados desse tipo
                    about: lorem.sentences()
                }
            })
    }

    private postData(): Array<Partial<PostEntity>> {
        return Array.from({ length: +process.env.SEED_NUM || 100 })
            .map<Partial<PostEntity>>(() => {
                return {
                    body: lorem.paragraphs(),
                    title: lorem.words(),
                    user: random.arrayElement(this.users)
                }
            })
    }

    private commentData(): Array<Partial<CommentEntity>> {
        return Array.from({ length: +process.env.SEED_NUM || 100 })
            .map<Partial<CommentEntity>>(() => {
                return {
                    body: lorem.sentences(),
                    post: random.arrayElement(this.posts),
                    user: random.arrayElement(this.users)
                }
            })
    }

    private likeData(): Array<Partial<LikeEntity>> {
        return Array.from({ length: +process.env.SEED_NUM || 100 })
            .map<Partial<LikeEntity>>(() => {
                return {
                    type: random.arrayElement(Object.keys(Type)),
                    post: random.arrayElement(this.posts),
                    user: random.arrayElement(this.users)
                }
            })
    }

    private followData(): Array<Partial<UserFollowerEntity>> {
        return Array.from({ length: +process.env.SEED_NUM || 100 })
            .map<Partial<UserFollowerEntity>>(() => {
                const followers = random.arrayElement(this.users)
                const following = random.arrayElement(this.users.filter(({ id }: Partial<UserEntity>) => id !== followers.id))

                return {
                    followers,
                    following,
                    status: random.arrayElement(Object.keys(Status)),
                }
            })
    }

    private async addData<T>(data: Array<Partial<T>>, entity: any, callback?: (savedData: Array<Partial<T>>) => void): Promise<void> {
        return this.entityManager.save<T, T>(entity, data as any)
            .then((savedData: Array<Partial<T>>) => {
                if (callback) {
                    callback(savedData)
                }
            })
            .catch(console.error)
    }
}