import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from "class-validator";
import { Repository } from "typeorm";
import { PostEntity } from "../post.entity";

@ValidatorConstraint({ async: true })
export class UniqueTitleConstraints implements ValidatorConstraintInterface {

    async validate(title: string): Promise<boolean> {
        const postRepo: Repository<PostEntity> = await (await import('../post.entity')).default

        return !!!(await postRepo.findOne({ where: { title: title } }))
    }
}

export function IsUniqueTitle(options?: ValidationOptions) {
    return (obj: object, propertyName: string) => {
        registerDecorator({
            target: obj.constructor,
            propertyName,
            options,
            validator: UniqueTitleConstraints,
            async: true,
        })
    }
}