import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../app/utils/cookieHelper";
import { Box, Container } from "@mui/material";
import jwtDecode from "jwt-decode";

const ProtectedRoute = ({ redirectTo , allowedRole }) => {
  const navigate = useNavigate();
  const user = getUser();
  const decode = jwtDecode(user);
  const userRole = decode?.userRoles?.[0]?.name;
 
  useEffect(() => {
    if (!userRole) {
      removeUser();
      navigate("/");
    } else if ( userRole !== allowedRole ) {
      navigate("/")
    }
  }, []);

  if (!userRole) return <Navigate to={redirectTo} replace />;

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default ProtectedRoute;