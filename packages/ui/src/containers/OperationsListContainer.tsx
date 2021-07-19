import { useCallback, useEffect, useState } from 'react';
import { useGetOperationsQuery } from '../services/operations';
import { CreateOperationModalContainer } from './CreateOperationModalContainer';
import { OperationsList } from '../components/OperationsList';
import {  EmptyList } from '../components/EmptyList';
import { Spinner } from '../components/Spinner';
import { Error } from '../components/Error';

export function useOperationsPolling(perPage: number, page: number) {
    const [shouldPoll, setShouldPoll] = useState(false);

    const params = {
        limit: perPage,
        page: page + 1
    };
    const options = { pollingInterval: shouldPoll ? 5000 : undefined };

    const { data: pageResult, isLoading, error } = useGetOperationsQuery(params, options);
    const operations = (pageResult?.data || []);

    useEffect(() => {
        setShouldPoll(operations.some(op => op.status == 'InProgress'));

        return () => setShouldPoll(false);
    },
    [operations]);

    return { pageResult, operations, isLoading, error };
}

const PER_PAGE = 5;

export function OperationsListContainer() {
    const [page, setPage] = useState(0);
    const { pageResult, operations, isLoading, error } = useOperationsPolling(PER_PAGE, page);
    const setFirstPage = () => setPage(0);

    if(isLoading) return <Spinner />;
    if(error) return <Error error={error} />;

    const createOperationButton = (
        <CreateOperationModalContainer onCreated={() => setFirstPage()}/>
    );
    
    if(operations.length == 0 || !pageResult) {
        return <EmptyList createOperationButton={createOperationButton} />;
    }

    return <OperationsList 
        operations={operations}
        pageResult={pageResult}
        perPage={PER_PAGE}
        changePage={setPage}
        onCreated={() => setFirstPage()}
    />;
}