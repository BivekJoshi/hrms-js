import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../app/utils/cookieHelper";
import { Container } from "@mui/material";

const ProtectedRoute = ({ redirectTo }) => {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      removeUser();
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
