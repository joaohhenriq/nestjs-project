import { EntityManager } from "typeorm";
import { UserEntity, Roles } from "./user/user.entity";
import { internet, name, random, lorem } from 'faker'
import * as dotenv from 'dotenv'

dotenv.config()

export class Seed {
    constructor(private readonly entityManager: EntityManager) { }

    fakeIt<T>(entity: any): void {
        switch (entity) {
            case UserEntity:
                this.addData(this.userDate(), entity)
                break;
            default:
                break;
        }
    }

    private userDate(): Array<Partial<UserEntity>> {
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

    private addData<T>(data: Array<Partial<T>>, entity: any): void {
        this.entityManager.save<T, T>(entity, data as any)
            .then((savedData: Array<Partial<T>>) => console.log(savedData))
            .catch(console.error)
    }
}