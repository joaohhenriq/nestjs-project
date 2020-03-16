import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { GenericService } from 'src/generic/generic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity])
  ],
  controllers: [FileController],
  providers: [FileService, GenericService]
})
export class FileModule { }
