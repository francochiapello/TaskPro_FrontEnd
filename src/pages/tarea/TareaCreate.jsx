import { Close } from '@mui/icons-material';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TareaHook from '../../hooks/Tarea.hook';
import UsuarioHook from '../../hooks/Usuario.hook';

import 'bootstrap/dist/css/bootstrap.min.css';

const TareaCreate = ({ setOpen, id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const tareaHook = TareaHook();
  const usuarioHook = UsuarioHook();
  const [message, setMessage] = useState(null);
  const [list, setList] = useState([]);

  const getListUsuarios = () => {
    usuarioHook
      .getAllSimpleList()
      .then((value) => {
        if (value.status == 200) {
          setList(value.data);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  const onSubmit = (data) => {
    tareaHook
      .create({
        proyectoId: id,
        ...data,
      })
      .then((value) => {
        if (value.status == 201) {
          setOpen(false);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    getListUsuarios();
  }, []);

  const handleClick = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {message != null && <Alert severity='error'>{message}</Alert>}
      <Box className='col-md-5' sx={{ marginTop: '1rem' }}>
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
          })}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          required
          label='Nombre'
          variant='outlined'
          error={errors.nombre && true}
          helperText={errors.nombre && errors.nombre.message}
        />
      </Box>
      <Box className='col-md-5' sx={{ marginTop: '1rem' }}>
        <TextField
          {...register('descripcion', {
            maxLength: {
              value: 300,
              message: 'La descripción no puede ser mayor a 300 carracteres',
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
      <Box className='row'>
        <Box className='col-md-5' sx={{ marginTop: '1rem' }}>
          <Controller
            name='asignadoA'
            control={control}
            rules={{
              required: 'required',
            }}
            render={({ field, fieldState: { error } }) => {
              const { onChange, value } = field;
              return (
                <Autocomplete
                  disablePortal
                  options={list}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  value={
                    value
                      ? list.find((option) => {
                          return value === option.id;
                        }) ?? null
                      : null
                  }
                  onChange={(event, newValue) => {
                    onChange(newValue ? newValue.id : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{ marginTop: 2 }}
                      required
                      variant='outlined'
                      label='Asignar a'
                      error={error && true}
                      helperText={error && error.message}
                    />
                  )}
                />
              );
            }}
          ></Controller>
        </Box>
        <Box className='col-md-5' sx={{ marginTop: '2rem' }}>
          <TextField
            {...register('estado', {
              required: {
                value: true,
                message: 'El estado es requerido',
              },
              maxLength: {
                value: 120,
                message: 'El estado no puede ser mayor a 80 carracteres',
              },
            })}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
            label='Estado'
            variant='outlined'
            error={errors.estado && true}
            helperText={errors.estado && errors.estado.message}
          />
        </Box>
      </Box>
      <Card sx={{ marginTop: '1rem' }}>
        <CardContent>
          <Box className='col-md-5' sx={{ marginTop: '1rem' }}>
            <TextField
              {...register('comentario', {
                maxLength: {
                  value: 300,
                  message: 'El comentario no puede ser mayor a 300 carracteres',
                },
              })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              label='Comentario'
              variant='outlined'
              multiline
              rows={3}
              error={errors.comentario && true}
              helperText={errors.comentario && errors.descripcion.message}
            />
          </Box>
        </CardContent>
      </Card>
      <Box>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Cerrar
        </Button>
        <Button type='submit'>Guardar</Button>
      </Box>
    </form>
  );
};

export default TareaCreate;
