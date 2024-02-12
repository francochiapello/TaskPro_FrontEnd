import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from '../pages/usuario/Register';
import Login from '../pages/usuario/Login';
import Profile from '../pages/usuario/Profile';
import ProtectLink from '../components/ProtectedLink';
import Layout from '../container/Layout';
import Error from '../pages/shared/Error';
import ProyectoList from '../pages/proyecto/ProyectoList';
import ProyectoCreate from '../pages/proyecto/ProyectoCreate';
import ProyectoUpdate from '../pages/proyecto/ProyectoUpdate';
import ProyectoDelete from '../pages/proyecto/ProyectoDelete';
import ProyectoDetail from '../pages/proyecto/ProyectoDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='*' element={<Error />} />

          <Route
            exact
            path='/'
            element={
              <ProtectLink>
                <Layout>
                  <ProyectoList />
                </Layout>
              </ProtectLink>
            }
          />
          <Route
            exact
            path='/profile'
            element={
              <ProtectLink>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectLink>
            }
          />
          <Route
            exact
            path='/proyecto'
            element={
              <ProtectLink>
                <Layout>
                  <ProyectoList />
                </Layout>
              </ProtectLink>
            }
          />
          <Route
            exact
            path='/proyecto/create'
            element={
              <ProtectLink>
                <Layout>
                  <ProyectoCreate />
                </Layout>
              </ProtectLink>
            }
          />
          <Route
            exact
            path='/proyecto/update/:id'
            element={
              <ProtectLink>
                <Layout>
                  <ProyectoUpdate />
                </Layout>
              </ProtectLink>
            }
          />
          <Route
            exact
            path='/proyecto/detail/:id'
            element={
              <ProtectLink>
                <Layout>
                  <ProyectoDetail />
                </Layout>
              </ProtectLink>
            }
          />
          <Route
            exact
            path='/proyecto/remove/:id'
            element={
              <ProtectLink>
                <Layout>
                  <ProyectoDelete />
                </Layout>
              </ProtectLink>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
