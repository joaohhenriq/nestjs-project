import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud'
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Crud({
    model: {
        type: PostEntity
    }
})
@Controller('post')
export class PostController {
    constructor(private readonly service: PostService) { }
}
