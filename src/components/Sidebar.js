import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link } from 'react-router-dom';
import GamepadIcon from '@mui/icons-material/Gamepad';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Add Games', 'Manage Games'].map((text, index) => (
          <ListItem button key={text}>
            <Link className='sidebar-link' to={index % 2 === 0 ? '/addgame' : '/manage-game'}>
              <ListItemIcon>
                {index % 2 === 0 ? <SportsEsportsIcon fontSize="medium" style={{margin: '0.1rem'}} /> : <GamepadIcon fontSize="medium" style={{margin: '0.1rem'}} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Add Movies', 'Manage Movies'].map((text, index) => (
          <ListItem button key={text}>
            <Link className='sidebar-link' to={index % 2 === 0 ? '/addmovie' : '/manage-movies'}>
              <ListItemIcon>
                  { index % 2 === 0 ? <LocalMoviesIcon fontSize="medium" style={{margin: '0.1rem'}} /> : <MovieCreationIcon fontSize="medium" style={{margin: '0.1rem'}} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem button key='change password'>
            <Link className='sidebar-link' to='/change-password'>
              <ListItemIcon>
                <SettingsIcon fontSize="medium" style={{margin: '0.1rem'}} />
              </ListItemIcon>
              <ListItemText primary='Change Password' />
            </Link>
          </ListItem>
            
    </Box>
    
  );

  return (
    <div>
        <React.Fragment>
          <Button onClick={toggleDrawer('left', true)}>
            <IconButton
                style={{ color: 'white '}}
                aria-label="open drawer"
                edge="end"
            >
                <MenuIcon />
            </IconButton>
          </Button>
          <SwipeableDrawer
            anchor='left'
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
