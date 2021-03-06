import { OperationReadDto, GetManyOperationResponseDto } from '@operations/api.client';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CreateOperationModal } from './CreateOperationModal';

interface OperationsListProps {
    operations: OperationReadDto[]
    pageResult: GetManyOperationResponseDto
    perPage: number
    changePage: (value: number) => any
    onCreated: () => any
}

export function OperationsList({ operations, pageResult, perPage, changePage, onCreated }: OperationsListProps) {
    return (
        <>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[]}
                    count={pageResult.total}
                    rowsPerPage={perPage}
                    page={pageResult.page - 1}
                    onPageChange={(_, pageNumber) => changePage(pageNumber)}
                />
                <CreateOperationModal onCreated={onCreated} />
            </Grid>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="operations list table">
                    <TableHead aria-label="operations list head">
                        <TableRow>
                            <TableCell>Operation</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {operations.map((op) => (
                        <TableRow key={op.id} aria-label="operation">
                            <TableCell component="th" scope="row">
                                {op.name}
                            </TableCell>
                            <TableCell align="right">{op.status}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}