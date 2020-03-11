import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';

@Crud({
    model: {
        type: CommentEntity
    }
})
@Controller('comment')
export class CommentController {
    constructor(private readonly service: CommentService) { }
}
