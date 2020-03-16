import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { GenericEntity } from 'src/generic/generic.entity'
import { IsOptional, IsString, IsEmpty, IsNumber } from 'class-validator'
import { Injectable } from '@nestjs/common'
import { PostEntity } from 'src/post/post.entity'

@Entity({ name: 'files' })
@Injectable()
export class FileEntity extends GenericEntity {

    @PrimaryGeneratedColumn()
    @IsOptional({ always: true })
    id: number

    @Column({ length: 50 })
    @IsString({ always: true })
    @IsEmpty({ always: true, message: 'hey.. it is empty' })
    original_name: string

    @Column({ length: 50 })
    @IsString({ always: true })
    @IsEmpty({ always: true, message: 'hey.. it is empty' })
    current_name: string

    @Column('int')
    @IsNumber()
    @IsEmpty({ always: true, message: 'hey.. it is empty' })
    size: number

    @Column({ length: 50 })
    @IsString({ always: true })
    @IsEmpty({ always: true, message: 'hey.. it is empty' })
    extension: string

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.files, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => PostEntity, (post: PostEntity) => post.files, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: PostEntity

    @Column({ type: 'number', select: false })
    user_id: number

    @Column({ type: 'number', select: false })
    post_id: number
}