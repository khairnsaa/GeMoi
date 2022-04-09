import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';

const theme = createTheme();

export default function ChangePassword() {
    const history = useHistory()
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = Cookies.get('token')
        const data = new FormData(event.currentTarget);

        axios.post(`https://backendexample.sanbersy.com/api/change-password`, {
            current_password: data.get('currentPass'),
            new_password: data.get('newPassword'),
            new_confirm_password: data.get('newConfirmPassword')
        }, {headers: {"Authorization" : "Bearer "+ token}})
        .then(() => {
            alert('password berhasil diganti')
            history.push('/')
        })
        // eslint-disable-next-line no-console
        console.log({
            oldPassword: data.get('currentPass'),
            newPassword: data.get('newPassword'),
            newConfirmPassword: data.get('newConfirmPassword'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="currentPass"
                    label="Last Pasword"
                    type="password"
                    name="currentPass"
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="newConfirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="newConfirmPassword"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Change Password
                    </Button>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}