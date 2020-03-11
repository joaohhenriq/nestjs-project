import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { LikeEntity } from './like.entity';
import { LikeService } from './like.service';

@Crud({
    model: {
        type: LikeEntity
    }
})
@Controller('like')
export class LikeController {
    constructor(private readonly service: LikeService) { }
}
