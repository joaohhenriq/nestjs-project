import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { GenericEntity } from 'src/generic/generic.entity'

@Entity({ name: 'posts' })
export class PostEntity extends GenericEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    title: string

    @Column('text')
    body: string

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity
}