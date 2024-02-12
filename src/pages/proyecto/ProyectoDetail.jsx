import { Add, ArrowBack, Delete, Edit } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProyectoHook from '../../hooks/Proyecto.hook';
import TareaHook from '../../hooks/Tarea.hook';
import UsuarioHook from '../../hooks/Usuario.hook';
import { useNavigate, useParams } from 'react-router-dom';
import TareaCreate from '../tarea/TareaCreate';
import DataTable from 'react-data-table-component';

const ProyectoDetail = () => {
  const proyectoHook = ProyectoHook();
  const tareaHook = TareaHook();
  const usuarioHook = UsuarioHook();
  const navigate = useNavigate();
  const params = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [reload, setReload] = useState(false);

  const getProyectById = () => {
    proyectoHook
      .getOne(params.id)
      .then((value) => {
        if (value.status == 200) {
          setProyecto(value.data);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.response.data.message);
      });
  };
  const getTareasByProyectId = () => {
    tareaHook
      .getAllMy(params.id)
      .then((value) => {
        setList(value.data);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    getProyectById();
    getTareasByProyectId();
  }, [open]);

  const addTarea = () => {};

  const handleClick = () => {
    setOpen(true);
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
            Proyecto {proyecto == null ? '' : proyecto.id}
          </Typography>
        }
        action={
          <>
            <Tooltip title='Volver'>
              <Button
                onClick={() => {
                  navigate('/');
                }}
                startIcon={<ArrowBack />}
                className='black'
              >
                Volver
              </Button>
            </Tooltip>
          </>
        }
      />
      <CardContent>
        {message != null && <Alert severity='error'>{message}</Alert>}
        <Box>
          <Typography variant='h3' sx={{ textAlign: 'left' }}>
            {proyecto == null ? '' : proyecto.nombre}
          </Typography>
          <Typography variant='body1' sx={{ textAlign: 'left' }}>
            {proyecto == null ? '' : proyecto.descripcion}
          </Typography>
        </Box>
        <React.Fragment>
          <Dialog
            maxWidth={'xl'}
            fullWidth={true}
            open={open}
            keepMounted
            onClose={() => {
              setOpen(false);
            }}
            title='Agregar Tarea'
          >
            <DialogTitle>Agregar Tarea</DialogTitle>
            <DialogContent>
              <TareaCreate setOpen={setOpen} id={params.id} />
            </DialogContent>
          </Dialog>
        </React.Fragment>
        <Card sx={{ marginTop: '1rem' }}>
          <CardHeader
            title={
              <Typography variant='h5' sx={{ textAlign: 'left' }}>
                Tareas
              </Typography>
            }
            action={
              <>
                <Tooltip title='Agregar Tarea'>
                  <Button
                    onClick={handleClick}
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
            <DataTable
              data={list}
              columns={[
                {
                  name: 'Opciones',
                  selector: (row) => row.id,
                  cell: (row) => {
                    return (
                      <>
                        <Tooltip title='Editar Proyecto'>
                          <Edit />
                        </Tooltip>
                        <Tooltip title='Eliminar Proyecto'>
                          <Delete />
                        </Tooltip>
                      </>
                    );
                  },
                },
                {
                  id: 'nombre',
                  name: 'Nombre',
                  selector: (row) => row.nombre,
                  sortable: true,
                },
                {
                  id: 'descripcion',
                  name: 'Descripcion',
                  selector: (row) => row.descripcion,
                  sortable: true,
                },
                {
                  id: 'estado',
                  name: 'Estado',
                  selector: (row) => row.estado,
                  sortable: true,
                },
                {
                  id: 'asignadoNombre',
                  name: 'Asignado a',
                  selector: (row) => row.asignadoNombre,
                  sortable: true,
                },
                {
                  id: 'updatedAt',
                  name: 'Fecha de Actualizacion',
                  selector: (row) => row.updatedAt,
                  sortable: true,
                },
              ]}
              pagination
              sortable
            />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ProyectoDetail;
