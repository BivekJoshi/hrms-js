import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../app/utils/cookieHelper";
import { Box, Container } from "@mui/material";
import jwtDecode from "jwt-decode";

const EmployeeProtectedRoute = ({ redirectTo }) => {
  const navigate = useNavigate();
  const user = getUser();
  const decode = jwtDecode(user);
  const userRole = decode?.userRoles?.[0]?.name;
  console.log(userRole)

  useEffect(() => {
    if (!userRole) {
      removeUser();
      navigate("/");
    } else if (userRole === "ROLE_EMPLOYEE") {
      navigate(redirectTo);
    }
  }, [userRole, navigate, redirectTo]);

  if (!userRole) return <Navigate to={redirectTo} replace />;

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default EmployeeProtectedRoute;