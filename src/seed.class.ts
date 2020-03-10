import { EntityManager } from "typeorm";
import { UserEntity, Roles } from "./user/user.entity";
import { internet, name, random, lorem } from 'faker'
import * as dotenv from 'dotenv'
import { PostEntity } from "./post/post.entity";
import { Post } from "@nestjs/common";

dotenv.config()

export class Seed {
    private users: Array<Partial<UserEntity>>

    constructor(private readonly entityManager: EntityManager) {
        this.users = []
    }

    async fakeIt<T>(entity: any): Promise<void> {
        switch (entity) {
            case UserEntity:
                return this.addData(this.userData(), entity, (data: Array<Partial<UserEntity>>) => this.users = data)
                break;
            case PostEntity:
                return this.addData(this.postData(), entity)
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