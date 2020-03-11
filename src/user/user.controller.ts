import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { Crud } from '@nestjsx/crud'

@Crud({
    model: {
        type: UserEntity
    }
})
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }

}
