import { Container, Divider, Typography } from '@mui/material';
import { AppBar } from 'src/components/AppBar';
import { ServiceList } from 'src/components/ServiceList';
import { UserList } from 'src/components/UserList';
import { Filters } from 'src/types/Filters';
import { removeUndefinedProps } from 'src/utils/removeUndefinedProps';
import { useUrlParam } from 'src/utils/useUrlParam';

export const HomePage = () => {
  const [filters, setFilters] = useUrlParam<Filters | undefined>(
    'user-filters',
  );

  return (
    <>
      <AppBar filters={filters} setFilters={setFilters} />
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
          filters={filters}
          selectedService={filters?.service}
          setSelectedService={(serviceId) => {
            setFilters((prev) =>
              removeUndefinedProps({ ...prev, service: serviceId }),
            );
          }}
        />
      </Container>
    </>
  );
};
