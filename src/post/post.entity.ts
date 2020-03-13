import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { GenericEntity } from 'src/generic/generic.entity'
import { CommentEntity } from 'src/comment/comment.entity'
import { LikeEntity } from 'src/like/like.entity'
import { IsOptional, IsDefined, IsString, IsNumber, IsEmpty } from 'class-validator'
import { CrudValidationGroups } from '@nestjsx/crud'

const { CREATE, UPDATE } = CrudValidationGroups

@Entity({ name: 'posts' })
export class PostEntity extends GenericEntity {

    @PrimaryGeneratedColumn()
    @IsOptional({ always: true })
    id: number

    @Column({ length: 50 })
    @IsDefined({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsString({ always: true })
    title: string

    @Column('text')
    @IsDefined({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsString({ always: true })
    body: string

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    comments: CommentEntity[]

    @OneToMany(() => LikeEntity, (like: LikeEntity) => like.post, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    likes: LikeEntity[]

    @Column({ default: 0, type: 'int' })
    @IsEmpty({ always: true, message: 'hey.. I know' })
    comments_num: number

    @Column({ type: 'number' })
    user_id: number
}