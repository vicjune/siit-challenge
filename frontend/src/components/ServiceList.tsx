import { OpenInNew } from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Paper,
  SxProps,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { theme } from 'src/theme';
import { Filters } from 'src/types/Filters';
import { calculateServicePrice } from 'src/utils/calculatePrice';
import { fetchServices } from 'src/utils/fetchServices';
import { fetchUsers } from 'src/utils/fetchUsers';
import { populateService, ServiceWithUsage } from 'src/utils/populateService';
import { useDebounce } from 'src/utils/useDebounce';

export const ServiceList = ({
  sx,
  filters,
  selectedService,
  setSelectedService,
}: {
  sx?: SxProps;
  filters?: Filters;
  selectedService?: number | undefined;
  setSelectedService?: (serviceId: number | undefined) => void;
}) => {
  const [services, setServices] = useState<ServiceWithUsage[] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debouncedFilters = useDebounce(filters);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const servicesJson = await fetchServices(debouncedFilters);
        const usersJson = await fetchUsers();

        setServices(
          servicesJson.map((service) => populateService(service, usersJson)),
        );
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      }
      setLoading(false);
    };

    fetch();
  }, [debouncedFilters]);

  if (loading || error || !services?.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          ...sx,
        }}
      >
        {loading ? (
          <CircularProgress size={60} />
        ) : error ? (
          <Typography color="error">{error.message}</Typography>
        ) : (
          <Typography>No result</Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', m: -1, ...sx }}>
      {services.map((service) => {
        const isSelected = selectedService === service.id;

        return (
          <ButtonBase
            key={service.id}
            sx={{ m: 1, borderRadius: 1 }}
            onClick={() => {
              setSelectedService?.(isSelected ? undefined : service.id);
            }}
          >
            <Paper
              elevation={isSelected ? 4 : 1}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                border: isSelected
                  ? `2px solid ${theme.palette.primary.main}`
                  : '2px solid transparent',
                backgroundColor: isSelected
                  ? alpha(theme.palette.primary.main, 0.08)
                  : undefined,
              }}
            >
              <Box sx={{ width: 100, mr: 4 }}>
                <Box
                  component="img"
                  src={service.logo_url}
                  sx={{ height: 50, maxWidth: 100 }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  width: 150,
                }}
              >
                <Typography variant="h6">{service.name}</Typography>
                <Typography color="Gray">
                  {calculateServicePrice(service)}€ /month
                </Typography>
                <Button
                  sx={{ mt: 2 }}
                  startIcon={<OpenInNew />}
                  href={service.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open
                </Button>
              </Box>
            </Paper>
          </ButtonBase>
        );
      })}
    </Box>
  );
};
