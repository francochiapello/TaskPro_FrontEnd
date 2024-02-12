import React from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Cookie from '../../services/Cookie.service';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UsuarioHook from '../../hooks/Usuario.hook';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { setCookie } = Cookie();
  const [show, setShow] = useState(false);
  const usuarioHook = UsuarioHook();

  const onSubmit = (data) => {
    usuarioHook
      .login(data)
      .then((value) => {
        if (value.status == 200) {
          console.log(value);
          setCookie(value.data);
          setMessage(null);
          navigate('/');
        }
      })
      .catch((error) => {
        setMessage(
          `Error en procesar la solicitud, ${error.response.data.message}`
        );
      });
  };

  const handleClick = () => {
    navigate('/register');
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        justifyContent: 'space-around',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '1rem',
      }}
    >
      <Card sx={{ width: '30%' }}>
        <CardContent>
          {message != null && <Alert severity='error'>{message}</Alert>}
          <Box>
            <Typography variant='h4' sx={{ textAlign: 'center' }}>
              Iniciar Sesion
            </Typography>
          </Box>
          <Box sx={{ maxWidth: '90%', marginLeft: '5%' }}>
            <TextField
              {...register('email', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@gmail\.com$/i,
                  message: 'Ingresa un correo electrónico de Gmail válido',
                },
              })}
              required
              label='Correo Electrónico'
              variant='outlined'
              fullWidth
              margin='normal'
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </Box>
          <Box sx={{ maxWidth: '90%', marginLeft: '5%' }}>
            <FormControl
              required
              fullWidth
              sx={{ marginTop: 2 }}
              variant='outlined'
            >
              <InputLabel htmlFor='contraseña'>Contraseña</InputLabel>
              <OutlinedInput
                {...register('contraseña', {
                  required: {
                    value: true,
                    message: 'La contraseña es requerida',
                  },
                })}
                id='contraseña'
                type={show ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => {
                        setShow(!show);
                      }}
                      onMouseDown={() => {
                        setShow(!show);
                      }}
                      edge='end'
                    >
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Contraseña'
                error={errors.contraseña && true}
              />
              {errors.contraseña && (
                <FormHelperText error={errors.contraseña && true}>
                  {errors.contraseña.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button onClick={handleClick}>Registrar</Button>
          <Button type='submit' sx={{ marginLeft: 'auto' }}>
            Iniciar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Login;
