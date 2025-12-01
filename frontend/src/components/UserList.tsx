import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  SxProps,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Filters } from 'src/types/Filters';
import { User } from 'src/types/User';
import { fetchUsers } from 'src/utils/fetchUsers';
import { useDebounce } from 'src/utils/useDebounce';

export const UserList = ({
  sx,
  filters,
}: {
  sx?: SxProps;
  filters?: Filters;
}) => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debouncedFilters = useDebounce(filters);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const resultJson = await fetchUsers(debouncedFilters);
        setUsers(resultJson);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      }
      setLoading(false);
    };

    fetch();
  }, [debouncedFilters]);

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
      {(() => {
        if (loading || error || !users?.length) {
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
          <List>
            {users.map((user, index) => (
              <Box key={user.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user.avatar_url} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.position} />
                </ListItem>
                {index !== users.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </Box>
            ))}
          </List>
        );
      })()}
    </Paper>
  );
};
