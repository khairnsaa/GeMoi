import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import Sidebar from '../components/Sidebar';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LogoutComponent from './Logout';

export default function ButtonAppBar() {

    const { setLoginStatus } = useContext(UserContext);
    const history = useHistory();
    
    const btnStyle = {
        margin: '0 1rem',
        color: '#fafafa',
        border: '1px solid #fafafa'
    }

    const handleLogout = () => {
        setLoginStatus(false)
        Cookies.remove('user')
        Cookies.remove('email')
        Cookies.remove('token')
        history.push('/login')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>
                {
                    Cookies.get('token') !== undefined &&
                    <div>
                        <Sidebar />
                    </div>
                }
                {
                    Cookies.get('token') === undefined && 
                    <div></div>
                }
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    <Link to='/' className="nav-link">GeMoi</Link>
                </Typography>
                <div>
                    <Link className='nav-link' to='/'>
                        <Button style={{ color: '#fafafa'}} ><HomeIcon fontSize="medium" style={{margin: '0.1rem'}} /> Home</Button>
                    </Link>
                    <Link className='nav-link' to='/movies'>
                        <Button style={{ color: '#fafafa'}} ><LocalMoviesIcon fontSize="medium" style={{margin: '0.1rem'}} />Movies</Button>
                    </Link>
                    <Link className='nav-link' to='/games'>
                        <Button style={{ color: '#fafafa'}} ><SportsEsportsIcon fontSize="medium" style={{margin: '0.1rem'}} />Games</Button>
                    </Link>
                </div>
                {
                    Cookies.get('token') !== undefined &&
                    <div>
                        <LogoutComponent logoutEvent={handleLogout} />
                        {/* <Button className='nav-link' variant="outlined" onClick={handleLogout} style={ btnStyle }>Logout</Button> */}
                    </div>
                }
                {
                    Cookies.get('token') === undefined && 
                    <div>
                        <Link className='nav-link' to='/signup'><Button variant="outlined" style={ btnStyle }>Sign up</Button></Link>
                        <Link className='nav-link' to='/login'><Button variant="contained">Login</Button></Link>
                    </div>
                }
            </Toolbar>
        </AppBar>
        </Box>
    );
}
