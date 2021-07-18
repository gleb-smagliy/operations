import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Operation } from './operation.entity';

export class OperationService extends TypeOrmCrudService<Operation> {
    constructor(
        @InjectRepository(Operation) private readonly repository
    ){
        super(repository)
    }
}