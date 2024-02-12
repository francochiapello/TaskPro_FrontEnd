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
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ProyectoHook from '../../hooks/Proyecto.hook';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack, Save } from '@mui/icons-material';

const ProyectoDelete = () => {
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
  const params = useParams();

  const getOneById = () => {
    proyectoHook
      .getOne(params.id)
      .then(({ data, status }) => {
        if (status == 200) {
          setValue('nombre', data.nombre);
          setValue('descripcion', data.descripcion);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    getOneById();
  }, []);

  const onSubmit = (data) => {
    proyectoHook
      .remove(params.id)
      .then(({ status }) => {
        if (status == 200) {
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
              ¿Estas seguro que quieres eliminar este Proyecto?
            </Typography>
          }
        />
        <CardContent>
          {message != null && <Alert severity='error'>{message}</Alert>}
          <Box sx={{ width: '40%', marginTop: '1rem' }}>
            <TextField
              {...register('nombre', {})}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
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
              {...register('descripcion', {})}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
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
          <Button
            className='black'
            onClick={handleClick}
            title='Volver'
            startIcon={<ArrowBack />}
          >
            No, Volver
          </Button>
          <Button type='submit'>Si, eliminar</Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default ProyectoDelete;
