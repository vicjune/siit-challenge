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
import { Service } from 'src/types/Service';

export const ServiceList = ({
  sx,
  selectedService,
  setSelectedService,
}: {
  sx?: SxProps;
  selectedService?: number | undefined;
  setSelectedService?: (serviceId: number | undefined) => void;
}) => {
  const [services, setServices] = useState<Service[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const result = await fetch('/services.json');
      const resultJson = (await result.json()) as Service[];
      setServices(resultJson);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
              <Box
                component="img"
                src={service.logo_url}
                sx={{ height: 50, mr: 4 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Typography variant="h6" sx={{ mr: 1 }}>
                  {service.name}
                </Typography>
                <Button
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
