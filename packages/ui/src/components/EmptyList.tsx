import { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface EmptyListProps {
    createOperationButton: ReactElement
}

export function EmptyList({
    createOperationButton
}: EmptyListProps)
{
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Box mr={1}>
                <Typography align="center">
                    No operations yet
                </Typography>
            </Box>
            {createOperationButton}
        </Grid>
    );
}