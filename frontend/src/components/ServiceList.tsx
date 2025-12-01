import { OpenInNew } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  SxProps,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Service } from 'src/types/Service';

export const ServiceList = ({ sx }: { sx?: SxProps }) => {
  const [services, setServices] = useState<Service[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const result = await fetch('/services.json');
      const resultJson = (await result.json()) as Service[];
      setServices(resultJson);
      console.log(resultJson);
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
      {services.map((service) => (
        <Paper
          key={service.id}
          sx={{ p: 2, m: 1, display: 'flex', alignItems: 'center' }}
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
            >
              Open
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
