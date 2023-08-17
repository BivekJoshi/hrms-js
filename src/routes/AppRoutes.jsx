import React, { lazy } from "react";
import ScrollToTop from "../app/utils/ScrolltoTop";
import { HashRouter, Route, Routes } from "react-router-dom";
import Applayout from "../layout/Applayout";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import { routes } from "./routes";
import ForgotPassword from "../app/pages/Auth/FogotPassword/ForgotPassword";
import Login from "../app/pages/Auth/Login/Login";

const AppRoutes = () => {
  const { isSuperAdmin, isAdmin, isHr, isEmployee } = useAuth();

  return (
    <HashRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" exact element={<Applayout />}>
            <Route path="/" exact element={<Login />} />
            <Route path="/forgot-password" exact element={<ForgotPassword />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route element={<ProtectedRoute redirectTo="/" />}>
                {routes.map((route) => {
                  if (route.path === "users" && isSuperAdmin || isAdmin || isHr ) {
                    
                    return (
                      <Route
                        key={route.id}
                        path={route.path}
                        exact
                        element={route.component}
                      />
                    );
                  } else if (
                    route.path === "users" && isEmployee
                  ) {
                    return <p>You Don Not Have Access!</p>
                  }
                  return null;
                })}
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </HashRouter>
  );
};

export default AppRoutes;
