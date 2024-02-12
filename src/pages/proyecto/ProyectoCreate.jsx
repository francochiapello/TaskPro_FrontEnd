import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ProyectoHook from '../../hooks/Proyecto.hook';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Save } from '@mui/icons-material';

const ProyectoCreate = () => {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState(null);
  const proyectoHook = ProyectoHook();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    proyectoHook
      .create(data)
      .then((value) => {
        if (value.status == 201) {
          navigate('/');
        }
      })
      .catch((error) => setMessage('Error al intentar guardar el proyecto'));
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          sx={{
            justifyContent: 'space-between',
            background: 'rgb(0 0 0 / 3%)',
          }}
          title={
            <Typography variant='h5' sx={{ textAlign: 'left' }}>
              Agregar Proyecto
            </Typography>
          }
          action={
            <Button
              className='black'
              onClick={handleClick}
              title='Volver'
              startIcon={<ArrowBack />}
            >
              Volver
            </Button>
          }
        />
        <CardContent>
          {message != null && <Alert severity='error'>{message}</Alert>}
          <Box sx={{ width: '40%', marginTop: '1rem' }}>
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
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
              label='Nombre'
              variant='outlined'
              error={errors.nombre && true}
              helperText={errors.nombre && errors.name.message}
            />
          </Box>
          <Box sx={{ width: '60%', marginTop: '1rem' }}>
            <TextField
              {...register('descripcion', {
                maxLength: {
                  value: 300,
                  message:
                    'La descripción no puede ser mayor a 300 carracteres',
                },
              })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              label='Descripción'
              variant='outlined'
              multiline
              rows={3}
              error={errors.descripcion && true}
              helperText={errors.descripcion && errors.descripcion.message}
            />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type='submit' startIcon={<Save />}>
            Guardar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default ProyectoCreate;
