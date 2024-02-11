import axios from "axios";
import config from "../config";
import Cookie from "../services/Cookie.service";
const { getCookie } = Cookie();

const UsuarioHook = () => {
    const url = `${config.URL}/Usuario`;
    const token = getCookie();

    const login = async (data) => {
        const response = axios.post(`${url}/Login`, data);

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
    const register = async (data) => {
        const response = axios.post(`${url}/Register`, data);

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
    const getProfile = async () => {
        const response = axios.post(`${url}/GetProfile`, {
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
    }
    const create = (data) => {
        const response = axios.post(`${url}/`, data, {
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
    }
    const update = (id, data) => {
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
    }
    const remove = (id) => {
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
    }

    return {
        login,
        register,
        getProfile,
        create,
        update,
        remove
    };
};

export default UsuarioHook;