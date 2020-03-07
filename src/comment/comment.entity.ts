import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { GenericEntity } from 'src/generic/generic.entity'
import { PostEntity } from 'src/post/post.entity'

@Entity({ name: 'comments' })
export class CommentEntity extends GenericEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    body: string

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    post: PostEntity
}