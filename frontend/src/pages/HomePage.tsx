import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { UserList } from 'src/components/UserList';

export const HomePage = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Siit</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <UserList />
      </Container>
    </>
  );
};
