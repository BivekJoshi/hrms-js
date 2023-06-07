import React, { lazy } from 'react';
import Loadable from '../app/components/Header/Loader/Loadable';
import ScrollToTop from '../app/utils/ScrolltoTop';
import Login from '../app/pages/Login/Login';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Applayout from '../layout/Applayout';
import AdminLayout from '../layout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import EmployeeOverview from '../app/pages/Employee/AddEmployee/EmployeeOverview/EmployeeOverview';
// import EmployeeOverview from '../app/pages/Employee/EmployeeOverview/EmployeeOverview';

const Dashboard = Loadable(lazy(() => import('../app/pages/Dashboard/Dashboard')));
const Employee = Loadable(lazy(() => import('../app/pages/Employee/Employee')));
const AddEmployee = Loadable(lazy(() => import('../app/pages/Employee/AddEmployee/AddEmployee')));
const Designation = Loadable(lazy(() => import('../app/pages/Designation/Designation')));
const Department = Loadable(lazy(() => import('../app/pages/Department/Department')));
const Company = Loadable(lazy(() => import('../app/pages/Company/Company')));
const EmployeeOverview = Loadable(lazy(() => import('../app/pages/Employee/AddEmployee/EmployeeOverview/EmployeeOverview')));

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
                <Route path="employee/:id" element={<EmployeeOverview />} />
                <Route path='employee/add' exact element={<AddEmployee />} />
                <Route path='designation' exact element={<Designation />} />
                <Route path='department' exact element={<Department />} />
                <Route path='company' exact element={<Company />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default AppRoutes;
