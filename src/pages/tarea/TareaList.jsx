import React, { useEffect, useState } from 'react';
import TareaHook from '../../hooks/Tarea.hook';
import UsuarioHook from '../../hooks/Usuario.hook';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from '@mui/material';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const TareaList = () => {
  const tareaHook = TareaHook();
  const usuarioHook = UsuarioHook();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [logged, setLogged] = useState(null);
  const [list, setList] = useState([]);

  const getUserLogged = () => {
    usuarioHook
      .getProfile()
      .then(({ status, data }) => {
        if (status == 200) {
          setLogged(data);
          getAllAsigned(data.id);
        }
      })
      .catch((error) => setMessage(error.response.data.message));
  };

  const getAllAsigned = (id) => {
    tareaHook
      .getAll()
      .then(({ status, data }) => {
        if (status == 200) {
          let array = Array.from(data);
          let asignados = array.filter((value) => value.asignadoA == id);
          setList(asignados);
        }
      })
      .catch((error) => setMessage(error.response.data.message));
  };

  const handleClick = () => {
    navigate('/');
  };

  useEffect(() => {
    getUserLogged();
  }, []);

  return (
    <Card>
      <CardHeader
        sx={{
          justifyContent: 'space-between',
          background: 'rgb(0 0 0 / 3%)',
        }}
        title={
          <Typography variant='h5' sx={{ textAlign: 'left' }}>
            Tareas Asignadas{' '}
            {logged == null ? '' : 'para ti, ' + logged?.nombre}
          </Typography>
        }
        action={
          <Button
            className='black'
            onClick={handleClick}
            title='Mis Proyectos'
            startIcon={<ArrowBack />}
          >
            Mis Proyectos
          </Button>
        }
      />
      <CardContent>
        <DataTable
          data={list}
          columns={[
            {
              id: 'nombre',
              name: 'Nombre',
              selector: (row) => row.nombre,
              sortable: true,
            },
            {
              id: 'estado',
              name: 'Estado',
              selector: (row) => row.estado,
              sortable: true,
            },
            {
              id: 'proyecto',
              name: 'Nombre del Proyecto',
              selector: (row) => row.proyecto.nombre,
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
            navigate('/tarea/detail/' + row.id);
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

export default TareaList;
