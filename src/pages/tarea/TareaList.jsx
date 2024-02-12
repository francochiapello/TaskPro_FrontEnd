import React, { useEffect, useState } from 'react';
import TareaHook from '../../hooks/Tarea.hook';
import UsuarioHook from '../../hooks/Usuario.hook';

const TareaList = () => {
  const tareaHook = TareaHook();
  const usuarioHook = UsuarioHook();
  const [message, setMessage] = useState(null);
  const [logged, setLogged] = useState(null);
  const [list, setList] = useState([]);

  const getUserLogged = () => {
    usuarioHook
      .getProfile()
      .then(({ status, data }) => {
        if (status == 200) {
          setLogged(data);
        }
      })
      .catch((error) => setMessage(error.response.data.message));
  };

  const getAllAsigned = () => {
    tareaHook
      .getAll()
      .then(({ status, data }) => {
        if (status == 200) {
          let array = Array.from(data);
          let asignados = array.filter(
            (value) => value.asignadoA == logged?.id
          );
          setList(asignados);
        }
      })
      .catch((error) => setMessage(error.response.data.message));
  };

  useEffect(() => {
    getUserLogged();
    getAllAsigned();
  }, []);

  return <div></div>;
};

export default TareaList;
