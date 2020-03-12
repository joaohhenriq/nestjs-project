import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Repository } from "typeorm";
import { CommentEntity } from "./comment.entity";
import { PostEntity } from "src/post/post.entity";

@EventSubscriber()
export class CommentSubscriber implements EntitySubscriberInterface<CommentEntity> {

    listenTo() {
        return CommentEntity
    }

    async afterInsert(event: InsertEvent<CommentEntity>) {
        const postRepo: Repository<PostEntity> = event.connection.manager.getRepository<PostEntity>('posts')
        const commentRepo: Repository<CommentEntity> = event.connection.manager.getRepository<CommentEntity>('comments')

        commentRepo.count({
            where: {
                post: {
                    id: event.entity.post.id
                }
            }
        }).then((count: number) => {
            postRepo.update({ id: event.entity.post.id }, { comments_num: count })
        })
    }
}