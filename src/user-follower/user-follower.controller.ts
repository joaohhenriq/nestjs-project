import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UserFollowerEntity } from './user-follower.entity';
import { UserFollowerService } from './user-follower.service';

@Crud({
    model: {
        type: UserFollowerEntity
    }
})
@Controller('user-follower')
export class UserFollowerController {
    constructor(private readonly service: UserFollowerService) { }
}
