import { AppBar, Container, Divider, Toolbar, Typography } from '@mui/material';
import { ServiceList } from 'src/components/ServiceList';
import { UserList } from 'src/components/UserList';

export const HomePage = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Siit</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Employees
        </Typography>

        <UserList sx={{ mb: 4 }} />

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h5" sx={{ mb: 2 }}>
          Services
        </Typography>

        <ServiceList />
      </Container>
    </>
  );
};
