import { Operation, CONSTRAINTS, OperationStatus } from '../operation';
import { MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ToDto } from './toDto.util';

export class OperationCreateDto 
    implements Omit<ToDto<Operation>, 'id' | 'createdOn' | 'status'>
{
    @ApiProperty()
    @MaxLength(CONSTRAINTS.NAME_LENGTH)
    @Expose()
    name: string
}

export class OperationReadDto
    implements Omit<ToDto<Operation>, 'createdOn'>
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
