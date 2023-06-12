import React, { lazy } from 'react';
import ScrollToTop from '../app/utils/ScrolltoTop';
import Login from '../app/pages/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Applayout from '../layout/Applayout';
import AdminLayout from '../layout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import routes from './routes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" exact element={<Applayout />}>
            <Route path="/" exact element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route element={<ProtectedRoute redirectTo="/" />}>
                {routes.map((route) => (
                  <Route
                    key={route.id}
                    path={route.path}
                    exact
                    element={route.component}
                  />
                ))}
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default AppRoutes;
