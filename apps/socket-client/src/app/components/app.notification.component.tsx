import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));

export interface NotificationFormAppBarProps {
  onNotify: (type: 'error' | 'warning' | 'info' | 'success', value: string) => void;
}

export default function NotificationFormAppBar(props: NotificationFormAppBarProps) {
  const [notify, setNotify] = useState<string>('');
  const [type, setType] = useState<'error' | 'warning' | 'info' | 'success'>('info');
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as ('error' | 'warning' | 'info' | 'success'));
  };
  return (
    <Box sx={{ flexGrow: 1 }} >
      <Box sx={{ marginRight: "auto", flexDirection: "column" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={"error"}>error</MenuItem>
          <MenuItem value={"warning"}>warning</MenuItem>
          <MenuItem value={"info"}>info</MenuItem>
          <MenuItem value={"success"}>success</MenuItem>
        </Select>
      </Box>
      <Search>
        <SearchIconWrapper>
          <NotificationAddIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Notificy all chat client...."
          inputProps={{ 'aria-label': 'search' }}
          onChange={(event) => setNotify(event.target.value)}
        />
      </Search>
      <Button className='bt-send' onClick={() => props.onNotify(type, notify)} >send</Button>
    </Box>
  );
}
