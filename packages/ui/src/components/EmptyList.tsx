import { ReactElement } from 'react';

interface EmptyListProps {
    createOperationButton: ReactElement
}

export function EmptyList({
    createOperationButton
}: EmptyListProps) 
{
    return <div>
        No operations yet. :(
        {createOperationButton}
    </div>;
}