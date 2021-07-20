import { useEffect, useState } from 'react';
import { useGetOperationsQuery } from '../../services/operations';

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