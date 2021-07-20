import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { OperationsListContainer } from './containers/OperationsListContainer';
import './App.css';

function App() {
  return (
    <Container>
      <Typography variant="h4" component="h1" align="center">Operations List</Typography>
      <OperationsListContainer />
    </Container>
  );
}

export default App;
