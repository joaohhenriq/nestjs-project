import { Controller, UploadedFile, Post, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud'
import { FileEntity } from './file.entity';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { GenericService } from 'src/generic/generic.service';


@Crud({
    model: {
        type: FileEntity
    },
    routes: {
        only: ['getOneBase']
    }
})
@Controller('file')
export class FileController implements CrudController<FileEntity> {

    static genericService: GenericService

    constructor(public service: FileService, genericService: GenericService) {
        FileController.genericService = genericService
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: (req: Express.Request, file: Express.Multer.File, callback) => callback(null, 'public/uploads'),
                filename: (req: Express.Request, file: Express.Multer.File, callback) => {
                    const [, ext] = file.mimetype.split('/') //mimetype ex: 'image/jpeg'
                    // o split acima cria um array com duas strings, como no exemplo, um pra image e um pra jpeg
                    // e como não precisa do primeiro, pega só o jpeg, que é a extensão (2° index)
                    FileController.genericService.pcoket.filename = `${v4()}.${ext}`
                    callback(null, FileController.genericService.pcoket.filename)
                }
            }),
            limits: {
                fileSize: 1e7, // the max file size in bytes, here it's 100MB
                files: 1
            }
        })
    )
    uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileEntity> {
        return this.service.dbSave(
            file,
            FileController.genericService.pcoket.filename
        )
    }
}
