import { Add, Close, Delete, Remove, Spa } from '@mui/icons-material';
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
import ComentarioHook from '../../hooks/Comentario.hook';

import 'bootstrap/dist/css/bootstrap.min.css';

const TareaDelete = ({ initialData, setOpen, id, setReload }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const tareaHook = TareaHook();
  const comentarioHook = ComentarioHook();
  const usuarioHook = UsuarioHook();
  const [message, setMessage] = useState(null);
  const [list, setList] = useState([]);
  const [logged, setLogged] = useState(null);

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
  const getUserLogged = () => {
    usuarioHook
      .getProfile()
      .then(({ status, data }) => {
        if (status == 200) {
          setLogged(data);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };
  const setFormData = () => {
    if (initialData != null) {
      setValue('nombre', initialData.nombre);
      setValue('descripcion', initialData.descripcion);
      setValue('asignadoA', initialData.asignadoA);
      setValue('estado', initialData.estado);
    }
  };
  const handleClick = () => {
    setOpen(false);
  };
  useEffect(() => {
    setFormData();
    getListUsuarios();
    getUserLogged();
  }, []);
  const onSubmit = () => {
    tareaHook
      .remove(initialData?.id)
      .then(({ status }) => {
        if (status == 200) {
          setOpen(false);
          setReload((prev) => !prev);
        }
      })
      .catch((error) => setMessage(error.response.data.message));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {message != null && <Alert severity='error'>{message}</Alert>}
      <Box className='col-md-5' sx={{ marginTop: '1rem' }}>
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
          helperText={errors.nombre && errors.nombre.message}
        />
      </Box>
      <Box className='col-md-5' sx={{ marginTop: '1rem' }}>
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
                  readOnly={true}
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
            {...register('estado', {})}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
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
        <CardHeader
          title={
            <Typography variant='h5' sx={{ textAlign: 'left' }}>
              Comentarios
            </Typography>
          }
        />
        <CardContent>
          <Box
            className='block overflow-auto'
            sx={{ marginTop: '1rem', maxHeight: '200px' }}
          >
            {initialData != null &&
              initialData.comentarios.map((val) => {
                return (
                  <Box
                    key={val.id}
                    sx={{ justifyContent: 'flex-end' }}
                    className='col-md-5 '
                  >
                    <span style={{ fontSize: '.7rem' }}>
                      {val.usuarioId == logged?.id ? 'Yo' : val.usuarioNombre}
                    </span>
                    <label className='form-control'>{val.contenido}</label>
                  </Box>
                );
              })}
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex' }}>
        <Button onClick={handleClick} sx={{ marginLeft: 'auto' }}>
          No, Cerrar
        </Button>
        <Button type='submit'>Si, Eliminar</Button>
      </Box>
    </form>
  );
};

export default TareaDelete;
