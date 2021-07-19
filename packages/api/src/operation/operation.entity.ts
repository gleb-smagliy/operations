import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { OperationProcessed } from './operation-processed.event';


export const CONSTRAINTS = {
    NAME_LENGTH: 128
};

export enum OperationStatus {
    InProgress = 'InProgress',
    Done = 'Done',
    Failed = 'Failed'
}

@Entity()
export class Operation extends AggregateRoot {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: CONSTRAINTS.NAME_LENGTH })
    name: string

    @CreateDateColumn()
    createdOn: number

    @Column({
        type: "varchar",
        enum: OperationStatus,
        default: OperationStatus.InProgress
    })
    status: OperationStatus


    process(toStatus: OperationStatus) {
        if(this.status == toStatus) return;

        this.status = toStatus;
        this.apply(new OperationProcessed(this.id, this.status));
    }
}

