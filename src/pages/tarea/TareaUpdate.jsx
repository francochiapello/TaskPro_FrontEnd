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

const TareaUpdate = ({ initialData, setOpen, id, setReload }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const tareaHook = TareaHook();
  const comentarioHook = ComentarioHook();
  const usuarioHook = UsuarioHook();
  const [message, setMessage] = useState(null);
  const [list, setList] = useState([]);
  const [logged, setLogged] = useState(null);
  const [openComentario, setOpenComentario] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tarea, setTarea] = useState(null);

  const getTareaById = () => {
    tareaHook
      .getOne(initialData?.id)
      .then(({ status, data }) => {
        if (status == 200) {
          setTarea(data);
        }
      })
      .catch((error) => setMessage(error.response.data.message));
  };
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
  const onSubmit = (data) => {
    tareaHook
      .update(initialData?.id, {
        proyectoId: id,
        ...data,
      })
      .then((value) => {
        if (value.status == 200) {
          setReload((prev) => !prev);
          setOpen(false);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };
  const addComentario = () => {
    let content = getValues('comentario');
    if (content != '') {
      comentarioHook
        .create({
          contenido: content,
          usuarioId: logged?.id,
          tareaId: initialData?.id,
        })
        .then(({ status }) => {
          if (status) {
            setValue('comentario', '');
            setOpenComentario(false);
            setReload((prev) => !prev);
            setRefresh((prev) => !prev);
          }
        })
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    } else {
      setError('comentario', {
        type: 'custom',
        message: 'Este campo es requerido',
      });
    }
  };
  const removeComentario = (id) => {
    comentarioHook
      .remove(id)
      .then(({ status }) => {
        if (status == 200) {
          setRefresh((prev) => !prev);
          setReload((prev) => !prev);
        }
      })
      .catch((error) => setMessage(error.response.data.message));
  };
  useEffect(() => {
    getListUsuarios();
    setFormData();
    getUserLogged();
    getTareaById();
  }, [refresh]);

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
        <CardHeader
          title={
            <Typography variant='h5' sx={{ textAlign: 'left' }}>
              Comentarios
            </Typography>
          }
          action={
            <>
              <Tooltip title='Agregar Tarea'>
                <Button
                  onClick={() => {
                    setOpenComentario(true);
                  }}
                  startIcon={<Add />}
                  className='black'
                >
                  Agregar
                </Button>
              </Tooltip>
            </>
          }
        />
        <CardContent>
          {openComentario && (
            <Box>
              <Box className='col-md-5'>
                <TextField
                  {...register('comentario', {
                    maxLength: {
                      value: 300,
                      message:
                        'El comentario no puede ser mayor a 300 carracteres',
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
              <Box>
                <Button
                  onClick={() => {
                    setOpenComentario(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={addComentario}>Guardar</Button>
              </Box>
            </Box>
          )}
          <Box
            className='block overflow-auto'
            sx={{ marginTop: '1rem', maxHeight: '200px' }}
          >
            {tarea != null &&
              tarea.comentarios.map((val) => {
                return (
                  <Box
                    key={val.id}
                    sx={{ justifyContent: 'flex-end' }}
                    className='col-md-5 '
                  >
                    <span style={{ fontSize: '.7rem' }}>
                      {val.usuarioId == logged?.id ? 'Yo' : val.usuarioNombre}
                    </span>
                    {val.usuarioId == logged?.id && (
                      <Tooltip title='Eliminar mi Comentario'>
                        <Button
                          onClick={() => {
                            removeComentario(val.id);
                          }}
                          sx={{ fontSize: '.5rem' }}
                        >
                          <Delete />
                        </Button>
                      </Tooltip>
                    )}
                    <label className='form-control'>{val.contenido}</label>
                  </Box>
                );
              })}
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex' }}>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          sx={{ marginLeft: 'auto' }}
        >
          Cerrar
        </Button>
        <Button type='submit'>Guardar</Button>
      </Box>
    </form>
  );
};

export default TareaUpdate;
