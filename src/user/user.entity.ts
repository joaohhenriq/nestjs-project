import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

enum Roles {
    user = 'user',
    admin = 'admin',
}

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50,
        unique: true,
    })
    name: string

    @Column({
        type: 'text',
        nullable: true
    })
    about: string

    @Column({
        length: 50,
        unique: true
    })
    email: string

    @Column({ type: 'enum', enum: Roles, default: Roles.user })
    role: Roles
}