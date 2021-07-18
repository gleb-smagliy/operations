import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

export const CONSTRAINTS = {
    NAME_LENGTH: 128
};

export enum OperationStatus {
    InProgress = 'InProgress',
    Done = 'Done',
    Failed = 'Failed'
}

@Entity()
export class Operation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: CONSTRAINTS.NAME_LENGTH })
    name: string

    @CreateDateColumn()
    createdOn: Date

    @Column({
        type: "varchar",
        enum: OperationStatus,
        default: OperationStatus.InProgress
    })
    status: OperationStatus
}

