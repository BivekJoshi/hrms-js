import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getUser, removeUser } from '../app/utils/cookieHelper';
import { Box } from '@mui/material';
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ redirectTo }) => {
  const navigate = useNavigate();
  const user = getUser();
  const decode = jwtDecode(user);
  const userRole = decode?.userRole;

  useEffect(() => {
    if (!user) {
      removeUser();
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  if (userRole) return <Navigate exact to={redirectTo} />;
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default ProtectedRoute;
