import { Operation, CONSTRAINTS, OperationStatus } from './operation.entity';
import { MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OperationCreateDto 
    implements Omit<Operation, 'id' | 'createdOn' | 'status'>
{
    @ApiProperty()
    @MaxLength(CONSTRAINTS.NAME_LENGTH)
    @Expose()
    name: string
}

export class OperationReadDto
{
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty({
        enum: OperationStatus
    })
    @Expose()
    status: OperationStatus;
}
