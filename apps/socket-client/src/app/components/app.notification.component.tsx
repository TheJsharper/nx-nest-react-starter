import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
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
          width: '30ch',
        },
      },
    },
  }));

  export default function SearchAppBar() {
    return (
      <Box  sx={{ flexGrow: 1 }} >
            
            <Search>
              <SearchIconWrapper>
                <NotificationAddIcon />
              </SearchIconWrapper>
              <StyledInputBase 
                placeholder="Notificy all chat client...."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button className='bt-send'  >send</Button>
      </Box>
    );
  }
  