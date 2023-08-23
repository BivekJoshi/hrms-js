import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../app/utils/cookieHelper";
import { Box, Container } from "@mui/material";

const ProtectedRoute = ({ redirectTo }) => {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      removeUser();
      navigate("/");
    }
  }, []);
  if (!user) return <Navigate to={redirectTo} replace />;
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default ProtectedRoute;