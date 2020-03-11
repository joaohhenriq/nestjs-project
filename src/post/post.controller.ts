import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud'
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Crud({
    model: {
        type: PostEntity
    },
    query: {
        alwaysPaginate: true,
        limit: 10,
        join: {
            comments: {
                eager: false
            },
            likes: {
                eager: false
            },
            'comments.user': {
                eager: false
            }
        }
    }
})
@Controller('post')
export class PostController {
    constructor(private readonly service: PostService) { }
}
