import { Close, Search } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  AppBar as MuiAppBar,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { SetStateAction } from 'jotai';
import { Dispatch } from 'react';
import { theme } from 'src/theme';
import { Filters } from 'src/types/Filters';
import { removeUndefinedProps } from 'src/utils/removeUndefinedProps';

export const AppBar = ({
  filters,
  setFilters,
}: {
  filters: Filters | undefined;
  setFilters: Dispatch<SetStateAction<Filters | undefined>>;
}) => {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ mr: 2 }}>
          Siit
        </Typography>
        <TextField
          sx={{
            mx: 4,
            my: 2,
            flex: 1,
            bgcolor: theme.palette.background.paper,
            borderRadius: 1,
          }}
          placeholder="Search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: filters?.search && (
                <IconButton
                  onClick={() =>
                    setFilters?.((prev) =>
                      removeUndefinedProps({ ...prev, name: undefined }),
                    )
                  }
                >
                  <Close />
                </IconButton>
              ),
            },
          }}
          value={filters?.search || ''}
          onChange={({ target }) =>
            setFilters?.((prev) => ({
              ...prev,
              search: target.value || undefined,
            }))
          }
        />
      </Toolbar>
    </MuiAppBar>
  );
};
