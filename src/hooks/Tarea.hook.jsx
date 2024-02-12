import axios from 'axios';
import config from '../config';
import Cookie from '../services/Cookie.service';
const { getCookie } = Cookie();

const TareaHook = () => {
  const url = `${config.URL}/Tarea`;
  const token = getCookie();

  const getAll = async () => {
    const response = axios.get(`${config.URL}/GetAll`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const getAllMy = async (id) => {
    const response = axios.get(`${url}/FindByProyectId/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const getOne = async (id) => {
    const response = axios.get(`${config.URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const create = async (data) => {
    const response = axios.post(`${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const update = async (id, data) => {
    const response = axios.put(`${url}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const remove = async (id) => {
    const response = axios.delete(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    getAll,
    getAllMy,
    getOne,
    create,
    update,
    remove,
  };
};

export default TareaHook;
