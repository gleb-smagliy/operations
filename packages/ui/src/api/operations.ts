import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from './api';

export const operationsApi = createApi({
    reducerPath: 'operationsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['OPERATIONS'],
    endpoints: builder => ({ 
      getOperations: builder.query({
        async queryFn(...args: Parameters<typeof api.operation.getManyOperations>) {
          try {
            const { data } = await api.operation.getManyOperations(...args);

            return { data };
          }
          catch(err) {
            console.error(err);
            return {
                error: 'Something went wrong'
            };
          }
        },
        providesTags: ['OPERATIONS']
      }),
      createOperation: builder.mutation({
        async queryFn(...args: Parameters<typeof api.operation.createOneOperation>) {
            try {
                const { data } = await api.operation.createOneOperation(...args);

                return { data };
            }
            catch(err) {
                console.error(err);
                return {
                    error: 'Something went wrong'
                };
            }
        },
        invalidatesTags: ['OPERATIONS']
      })
    }),
  })
  
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetOperationsQuery,
    useCreateOperationMutation
} = operationsApi;