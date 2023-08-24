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

const AppRoutes = () => {
 
  return (
    <>
    <HashRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" exact element={<Applayout />}>
            <Route path="/" exact element={<Login />} />
            <Route path="/forgot-password" exact element={<ForgotPassword />} />
            <Route path="/hrms/user-activation" exact element={<RenamePassword />} />
       
            <Route path="/admin/dashboard" element={<AccessControl Component={<AdminLayout />} /> }>
              <Route index element={<Dashboard />} />
                {adminRoutes.map((route) => (
                  <Route
                    key={route.id}
                    path={route.path}
                    exact
                    element={route.component}
                  />
                ))}
              </Route>

            <Route path="/employee/dashboard" element={<AccessControl Component={<EmployeeLayout />} /> }>
                <Route index element={<EmployeeDashbord />} />
                  {
                    employeeRoutes.map((route) => (
                      <Route
                        key={route.id}
                        path={route.path}
                        exact
                        element={route.component}
                      />
                    ))
                  }
                </Route>


            </Route>
          </Routes>
        </ScrollToTop>
      </HashRouter>
    </>
  );
};

export default AppRoutes;