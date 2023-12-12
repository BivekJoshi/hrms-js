import React, { lazy } from "react";
import ScrollToTop from "../app/utils/ScrolltoTop";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Applayout from "../layout/Applayout";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import { adminRoutes } from "./adminRoutes";
import { employeeRoutes } from "./employeeRoutes";
import ForgotPassword from "../app/pages/Auth/FogotPassword/ForgotPassword";
import Login from "../app/pages/Auth/Login/Login";
import RenamePassword from "../app/pages/Auth/ResetPassword/RenamePassword";
import EmployeeLayout from "../layout/EmployeeLayout";
import { AccessControl } from "./AccessControl";
import Dashboard from "../app/pages/Dashboard/Dashboard";
import EmployeeDashbord from "../app/pages/EmployeePage/EmployeeDashboard/EmployeeDashbord";
import LoggedInRoutes from "./LoggedInRoutes";
import ErrorPage from "./ErrorPage";

const AppRoutes = () => {
  
  return (
    <>
      <HashRouter>
        <ScrollToTop>
          <Routes>
            <Route exact path="/" element={<Applayout />}>
              <Route exact path="/" element={<Login />} />
              <Route exact path="*" element={<ErrorPage />} />
              <Route
                exact
                path="/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/hrms/user-activation"
                element={<RenamePassword />}
              />

              <Route element={<ProtectedRoute redirectTo="/" />}>
                <Route path="/admin" element={<AdminLayout />}>
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
                    {adminRoutes.map((route) => (
                      <Route
                        key={route.id}
                        path={route.path}
                        exact
                        element={route.component}
                      />
                    ))}
                  </Route>
                </Route>

                <Route path="/employee" element={<EmployeeLayout />}>
                  <Route
                    element={
                      <LoggedInRoutes
                        redirectTo="/404"
                        allowedRoles={["ROLE_EMPLOYEE"]}
                      />
                    }
                  >
                    <Route index element={<EmployeeDashbord />} />
                    {employeeRoutes.map((route) => (
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
