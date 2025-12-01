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
import { User } from 'src/types/User';

export const UserList = ({ sx }: { sx?: SxProps }) => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await fetch('/users.json');
      const resultJson = (await result.json()) as User[];
      setUsers(resultJson);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
    <Paper sx={{ ...sx }}>
      <List sx={{ width: '100%' }}>
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
    </Paper>
  );
};
