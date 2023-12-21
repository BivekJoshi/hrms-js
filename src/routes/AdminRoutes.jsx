import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getUser, removeUser } from '../app/utils/cookieHelper';
import { Box } from '@mui/material';
import jwtDecode from 'jwt-decode';

const AdminRoutes = ({ redirectTo }) => {
  const user = getUser();
  const decode = jwtDecode(user);
  const userRole = decode?.userRole;

  if (userRole && userRole === 'ROLE_EMPLOYEE')
    return <Navigate exact to={redirectTo} />;

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AdminRoutes;
