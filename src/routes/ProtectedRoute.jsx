import  { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../app/utils/cookieHelper";
import { Box } from "@mui/material";

const ProtectedRoute = ({ redirectTo }) => {
  const navigate = useNavigate();
  const user = getUser();

 
  useEffect(() => {
    if (!user) {
      removeUser();
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  if (!user) return <Navigate exact to={redirectTo} />;

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default ProtectedRoute;