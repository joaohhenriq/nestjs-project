import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm'
import { PostEntity } from 'src/post/post.entity'
import { GenericEntity } from 'src/generic/generic.entity'
import { CommentEntity } from 'src/comment/comment.entity'
import { LikeEntity } from 'src/like/like.entity'

enum Roles {
    user = 'user',
    admin = 'admin',
}

@Entity({ name: 'users' })
export class UserEntity extends GenericEntity {

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

    @OneToMany(() => PostEntity, (post: PostEntity) => post.user)
    posts: PostEntity[]

    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    comments: CommentEntity[]

    @OneToMany(() => LikeEntity, (like: LikeEntity) => like.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    likes: LikeEntity[]
}