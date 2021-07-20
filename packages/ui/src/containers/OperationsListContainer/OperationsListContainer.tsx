import { useState, useCallback } from 'react';
import { CreateOperationModal } from '../../components/CreateOperationModal';
import { OperationsList } from '../../components/OperationsList';
import {  EmptyList } from '../../components/EmptyList';
import { Spinner } from '../../components/Spinner';
import { Error } from '../../components/Error';
import { useOperationsPolling } from './useOperationsPolling';

const PER_PAGE = 5;

export function OperationsListContainer() {
    const [page, setPage] = useState(0);
    const { pageResult, operations, isLoading, error } = useOperationsPolling(PER_PAGE, page);
    const setFirstPage = useCallback(() => setPage(0), [setPage]);

    if(isLoading) return <Spinner />;
    if(error) return <Error error={error} />;

    const createOperationButton = (
        <CreateOperationModal onCreated={setFirstPage}/>
    );
    
    if(operations.length === 0 || !pageResult) {
        return <EmptyList createOperationButton={createOperationButton} />;
    }

    return <OperationsList 
        operations={operations}
        pageResult={pageResult}
        perPage={PER_PAGE}
        changePage={setPage}
        onCreated={setFirstPage}
    />;
}