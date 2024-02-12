import React, { useEffect, useState } from 'react';
import { Adb, Person } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Cookie from '../services/Cookie.service';
import { useNavigate } from 'react-router-dom';
import UsuarioHook from '../hooks/Usuario.hook';

const Layout = ({ children }) => {
  const usuarioHook = UsuarioHook();
  const { remove, getCookie } = Cookie();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const getUserLogged = () => {
    usuarioHook
      .getProfile()
      .then(({ status, data }) => {
        if (status == 200) {
          setUser(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserLogged();
  }, []);

  const handleCloseNavMenu = () => {};
  const handleExist = () => {
    remove();
    navigate('/login');
  };
  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TaskPro
            </Typography>

            <Adb sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='#app-bar-with-responsive-menu'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {getCookie() != null && (
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                  }}
                  href='/proyecto'
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Proyectos
                </Button>
              )}
            </Box>
            <Box>
              {user != null && (
                <MenuItem>
                  <Typography textAlign='center'>
                    <Person />
                    {user.nombre}
                  </Typography>
                </MenuItem>
              )}
            </Box>
            {getCookie() != null && (
              <Box sx={{ flexGrow: 0 }}>
                <MenuItem onClick={handleExist}>
                  <Typography textAlign='center'>Salir</Typography>
                </MenuItem>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ maxWidth: '90%', marginLeft: '5%', marginTop: '1rem' }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
