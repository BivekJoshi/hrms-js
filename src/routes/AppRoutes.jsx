import React, { lazy } from 'react';
import ScrollToTop from '../app/utils/ScrolltoTop';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Applayout from '../layout/Applayout';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from '../app/pages/Auth/FogotPassword/ForgotPassword';
import Login from '../app/pages/Auth/Login/Login';
import RenamePassword from '../app/pages/Auth/ResetPassword/RenamePassword';
import Dashboard from '../app/pages/Dashboard/Dashboard';
import EmployeeDashbord from '../app/pages/EmployeePage/EmployeeDashboard/EmployeeDashbord';
import LoggedInRoutes from './LoggedInRoutes';
import ErrorPage from './ErrorPage';
import AdminSidebar from '../app/components/SideBar/AdminSideBar';
import { routes } from './routes';
import NewLogin from '../app/pages/Auth/Login/NewLogin';

const AppRoutes = () => {
  return (
    <>
      <HashRouter>
        <ScrollToTop>
          <Routes>
            <Route exact path='/' element={<NewLogin />} />
            <Route exact path='/' element={<Applayout />}>
              <Route exact path='*' element={<ErrorPage />} />
              <Route
                exact
                path='/forgot-password'
                element={<ForgotPassword />}
              />
              <Route
                exact
                path='/hrms/user-activation'
                element={<RenamePassword />}
              />

              <Route element={<ProtectedRoute redirectTo='/' />}>
                <Route path='/admin' element={<AdminSidebar />}>
                  <Route
                  // element={
                  //   <LoggedInRoutes
                  //     redirectTo="/404"
                  //     allowedRoles={[
                  //       "ROLE_SUPER_ADMIN",
                  //       "ROLE_ADMIN",
                  //       "ROLE_MANAGER",
                  //       "ROLE_HR_ADMIN",
                  //       "ROLE_HR_CLERK",
                  //     ]}
                  //   />
                  // }
                  >
                    <Route exact index element={<Dashboard />} />
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

                <Route path='/employee' element={<AdminSidebar />}>
                  <Route
                    element={
                      <LoggedInRoutes
                        redirectTo='/404'
                        allowedRoles={['ROLE_EMPLOYEE']}
                      />
                    }
                  >
                    <Route index element={<EmployeeDashbord />} />
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
            </Route>
          </Routes>
        </ScrollToTop>
      </HashRouter>
    </>
  );
};

export default AppRoutes;
