import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { GenericEntity } from 'src/generic/generic.entity'

enum Status {
    blocked = 'blocked',
    accepted = 'accepted',
    pending = 'pending'
}

@Entity({ name: 'user_followers' })
export class UserFollowerEntity extends GenericEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.followers, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'followers_id' })
    followers: UserEntity

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.following, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'following_id' })
    following: UserEntity

    @Column({ enum: Status, type: 'enum', default: Status.pending })
    status: Status
}