import React from 'react';
import ScrollToTop from '../app/utils/ScrolltoTop';
import Login from '../app/pages/Login/Login';
import Dashboard from '../app/pages/Dashboard/Dashboard';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Applayout from '../layout/Applayout';
import AdminLayout from '../layout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import Employee from '../app/pages/Employee/Employee';
import AddEmployee from '../app/pages/Employee/AddEmployee/AddEmployee';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' exact element={<Applayout />}>
            <Route path='/' exact element={<Login />} />
            <Route path='/admin' element={<AdminLayout />}>
              <Route element={<ProtectedRoute redirectTo='/' />}>
                <Route path='dashboard' exact element={<Dashboard />} />
                <Route path='employee' exact element={<Employee />} />
                <Route path='employee/add' exact element={<AddEmployee />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default AppRoutes;
