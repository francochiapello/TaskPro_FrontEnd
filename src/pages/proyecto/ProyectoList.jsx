import { Add, Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProyectoHook from '../../hooks/Proyecto.hook';
import DataTable from 'react-data-table-component';

const ProyectoList = () => {
  const navigate = useNavigate();
  const proyectoHook = ProyectoHook();
  const [list, setList] = useState([]);
  const [message, setMessage] = useState(null);

  const getAll = () => {
    proyectoHook
      .getAll()
      .then((value) => {
        setList(value.data);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleClick = () => {
    navigate('/proyecto/create');
  };

  const navigateToTareas = () => {
    navigate('/tarea');
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
            Mis Proyectos
          </Typography>
        }
        action={
          <>
            <Tooltip title='Agregar un nuevo proyecto'>
              <Button
                onClick={handleClick}
                startIcon={<Add />}
                className='black'
              >
                Agregar
              </Button>
            </Tooltip>
            <Tooltip title='Tareas Abiertas'>
              <Button onClick={navigateToTareas} className='black'>
                Tareas
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
                      <Link className='link' to={'/proyecto/update/' + row.id}>
                        <Edit />
                      </Link>
                    </Tooltip>
                    <Tooltip title='Eliminar Proyecto'>
                      <Link className='link' to={'/proyecto/remove/' + row.id}>
                        <Delete />
                      </Link>
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
              id: 'updatedAt',
              name: 'Fecha de Actualizacion',
              selector: (row) => row.updatedAt,
              sortable: true,
            },
          ]}
          pagination
          sortable
          Clicked
          onRowClicked={(row) => {
            navigate('/proyecto/detail/' + row.id);
          }}
          conditionalRowStyles={[
            {
              when: (row) => true,
              style: {
                '&:hover': {
                  cursor: 'pointer',
                },
              },
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default ProyectoList;
