import { OperationStatus } from './operation.entity';

export class OperationProcessed {
    constructor(
        readonly operationId: string,
        readonly status: OperationStatus
    ) {}    
}