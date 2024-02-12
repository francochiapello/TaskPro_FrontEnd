import React, { useState } from 'react';
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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import Cookie from '../../services/Cookie.service';
import UsuarioHook from '../../hooks/Usuario.hook';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setCookie } = Cookie();
  const usuarioHook = UsuarioHook();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);

  const onSubmit = (data) => {
    usuarioHook
      .register(data)
      .then((value) => {
        if (value.status == 200) {
          setMessage(null);
          navigate('/login');
        }
      })
      .catch((error) => {
        setMessage(
          `Error en procesar la solicitud, ${error.response.data.message}`
        );
      });
  };

  const handleClick = () => {
    navigate('/');
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
              Crear Cuenta
            </Typography>
          </Box>
          <Box sx={{ width: '90%', marginLeft: '5%' }}>
            <TextField
              {...register('nombre', {
                required: {
                  value: true,
                  message: 'El nombre es requerida',
                },
                maxLength: {
                  value: 120,
                  message: 'El nombre no puede ser mayor a 120 carracteres',
                },
                pattern: {
                  value: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/,
                  message: 'El nombre solo puede contener letras del alfabeto',
                },
              })}
              fullWidth
              required
              label='Nombre'
              variant='outlined'
              error={errors.nombre && true}
              helperText={errors.nombre && errors.nombre.message}
            />
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
          <Button onClick={handleClick}>Iniciar</Button>
          <Button type='submit' sx={{ marginLeft: 'auto' }}>
            Registrar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Register;
