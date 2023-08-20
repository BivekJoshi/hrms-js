import React, { lazy, useState, useEffect } from "react";
import ScrollToTop from "../app/utils/ScrolltoTop";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import Applayout from "../layout/Applayout";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import { routes } from "./routes";
import ForgotPassword from "../app/pages/Auth/FogotPassword/ForgotPassword";
import Login from "../app/pages/Auth/Login/Login";
import useAuth from "../auth/hooks/component/login/useAuth";

const AppRoutes = () => {
   const { isSuperAdmin, isAdmin, isEmployee } = useAuth();
  console.log({
    superadmin: isSuperAdmin,
    isadmin: isAdmin,
    isEmployee: isEmployee,
  });

  return (
    <>
      <HashRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" exact element={<Applayout />}>
              <Route path="/" exact element={<Login />} />
              <Route
                path="/forgot-password"
                exact
                element={<ForgotPassword />}
              />

              <Route path="/admin" element={<AdminLayout />}>
                <Route element={<ProtectedRoute redirectTo="/" />}>
                  
                  {routes.map((route) => {
                    if ( (route.path !== "users" && route.path !== "employee") || isSuperAdmin || isAdmin ||isEmployee) {
                      return (
                        <Route
                          key={route.id}
                          path={route.path}
                          exact
                          element={route.component}
                        />
                      );
                    } else if (isEmployee) {
                      return (
                        <Route
                          key={route.id}
                          path={route.path}
                          element={
                            <p>You don't have access to this component.</p>
                          }
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
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