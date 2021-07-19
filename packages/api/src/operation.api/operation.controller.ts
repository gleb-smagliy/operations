import { Controller } from "@nestjs/common";
import { Crud, CrudController } from '@nestjsx/crud';
import { Operation, OperationService } from '../operation';
import { OperationCreateDto, OperationReadDto } from './operation.dto';

@Crud({
    model: { type: Operation },
    params: {
        id: {
            type: 'uuid',
            primary: true,
            field: 'id'
        }
    },
    dto: {
        create: OperationCreateDto
    },
    serialize: {
        get: OperationReadDto
    },
    query: {
        maxLimit: 100,
        alwaysPaginate: true
    },
    routes: {
        only: ['createOneBase', 'getManyBase', 'getOneBase']
    }
})
@Controller('operation')
export class OperationController implements CrudController<Operation> {
    constructor(public service: OperationService) {}
}