import {
  Add,
  ArrowBack,
  Close,
  Delete,
  Remove,
  Spa,
} from '@mui/icons-material';
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
import { useNavigate, useParams } from 'react-router-dom';

const TareaDetail = () => {
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
  const usuarioHook = UsuarioHook();
  const comentarioHook = ComentarioHook();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [logged, setLogged] = useState(null);
  const [tarea, setTarea] = useState(null);
  const [openComentario, setOpenComentario] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [erroComentario, setErroComentario] = useState(null);
  const params = useParams();

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
  const getById = () => {
    tareaHook
      .getOne(params.id)
      .then(({ status, data }) => {
        if (status == 200) {
          setTarea(data);
          setValue('nombre', data.nombre);
          setValue('descripcion', data.descripcion);
          setValue('estado', data.estado);
        }
      })
      .catch((error) => setMessage(error.response.data.message));
  };
  useEffect(() => {
    getUserLogged();
    getById();
  }, [refresh]);

  const addComentario = () => {
    let content = getValues('comentario');
    if (content == '') {
      setError('comentario', {
        type: 'custom',
        message: 'Este campo es requerido',
      });
      setErroComentario('Este campo es requerido');
    } else {
      comentarioHook
        .create({
          contenido: content,
          usuarioId: logged?.id,
          tareaId: params.id,
        })
        .then(({ status }) => {
          if (status) {
            setValue('comentario', '');
            setOpenComentario(false);
            setRefresh((prev) => !prev);
            setErroComentario(null);
          }
        })
        .catch((error) => {
          setMessage(error.response.data.message);
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
  const handleClick = () => {
    navigate('/tarea');
  };

  const onSubmit = (data) => {
    tareaHook
      .update(params.id, {
        ...data,
        asignadoA: tarea?.asignadoA,
        proyectoId: tarea?.proyectoId,
      })
      .then(({ status, data }) => {
        if (status == 200) {
          navigate('/tarea');
        }
      })
      .catch((error) => setMessage(error.response.data.message));
  };

  return (
    <Card>
      <CardHeader
        sx={{
          justifyContent: 'space-between',
          background: 'rgb(0 0 0 / 3%)',
        }}
        title={
          <Typography variant='h5' sx={{ textAlign: 'left' }}>
            Proyecto
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
            <Box className='col-md-5' sx={{ marginTop: '2rem' }}>
              <TextField
                {...register('estado', {})}
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
                      helperText={
                        errors.comentario && errors.comentario.message
                      }
                    />
                  </Box>
                  <Box>
                    <Button
                      onClick={() => {
                        setOpenComentario(false);
                        setErroComentario(null);
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
                          {val.usuarioId == logged?.id
                            ? 'Yo'
                            : val.usuarioNombre}
                        </span>
                        <label className='form-control'>{val.contenido}</label>
                      </Box>
                    );
                  })}
              </Box>
            </CardContent>
          </Card>
          <Box sx={{ display: 'flex' }}>
            <Button sx={{ marginLeft: 'auto' }} type='submit'>
              Actualizar
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default TareaDetail;
