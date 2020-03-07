import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { GenericEntity } from 'src/generic/generic.entity'
import { CommentEntity } from 'src/comment/comment.entity'

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

    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    comments: CommentEntity[]
}