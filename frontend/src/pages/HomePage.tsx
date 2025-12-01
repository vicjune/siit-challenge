import { AppBar, Container, Divider, Toolbar, Typography } from '@mui/material';
import { ServiceList } from 'src/components/ServiceList';
import { UserList } from 'src/components/UserList';
import { UserFilters } from 'src/utils/buildUserUrl';
import { useUrlParam } from 'src/utils/useUrlParam';

export const HomePage = () => {
  const [filters, setFilters] = useUrlParam<UserFilters | undefined>(
    'user-filters',
  );

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

        <UserList sx={{ mb: 4 }} filters={filters} />

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h5" sx={{ mb: 2 }}>
          Services
        </Typography>

        <ServiceList
          selectedService={filters?.service}
          setSelectedService={(serviceId) => {
            setFilters(serviceId ? { service: serviceId } : undefined);
          }}
        />
      </Container>
    </>
  );
};
