import React, { useEffect, useState } from 'react';
import { useGetOperationsQuery, useCreateOperationMutation } from './api';
import logo from './logo.svg';
import './App.css';
import { OperationReadDto } from '../../api.client/dist/ApiClient';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const PER_PAGE = 5;

function useOperationsListUpdate(perPage: number, page: number) {
  const [shouldPoll, setShouldPoll] = useState(false);

  const params = { limit: perPage, page: page + 1 };
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

function App() {
  const [page, setPage] = useState(0);

  const { pageResult, operations, isLoading, error } = useOperationsListUpdate(PER_PAGE, page);
  const [createOperation, { isLoading: isCreating }] = useCreateOperationMutation();

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error: {error}</div>
  }

  if(operations.length == 0 || !pageResult) {
    return <div>No records...</div>
  }

  return (
    <Container>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5,10,25]}
        count={pageResult.total}
        rowsPerPage={PER_PAGE}
        page={pageResult.page - 1}
        onPageChange={(_, pageNumber) => setPage(pageNumber)}
      />
      <Grid container direction="row" justifyContent="flex-end" alignItems="center">
        <Button variant="contained" color="primary" onClick={() => createOperation({ name: `new operation ${Math.random().toString().substring(3, 5)}` })}>
          Create
        </Button>
      </Grid>
      <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Operation</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {operations.map((op) => (
            <TableRow key={op.id}>
              <TableCell component="th" scope="row">
                {op.name}
              </TableCell>
              <TableCell align="right">{op.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

export default App;
