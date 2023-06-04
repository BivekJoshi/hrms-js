import React from 'react';
import ScrollToTop from '../app/utils/ScrolltoTop';
// import Login from '../app/pages/Login/Login';
import Dashboard from '../app/pages/Dashboard/Dashboard';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Applayout from '../layout/Applayout';
import AdminLayout from '../layout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import LoginLayout from '../app/pages/Login/LoginLayout';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' exact element={<Applayout />}>
            {/* <Route path='/' exact element={<Login />} /> */}
            <Route path='/' exact element={<LoginLayout />} />
            <Route path='/admin' exact element={<AdminLayout />}>
              <Route element={<ProtectedRoute redirectTo='/' />}>
                <Route path='dashboard' exact element={<Dashboard />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default AppRoutes;
