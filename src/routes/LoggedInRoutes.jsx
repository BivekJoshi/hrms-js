import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getUser, removeUser } from '../app/utils/cookieHelper';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

const LoggedInRoutes = ({ redirectTo, allowedRoles }) => {
  const navigate = useNavigate();
  const user = getUser();
  const decode = jwtDecode(user);
  const userRole = decode?.userRole;

  useEffect(() => {
    if (!user) {
      removeUser();
      navigate('/');
      toast.warn('Login To Access The Link');
    }
    // eslint-disable-next-line
  }, []);

  if (!allowedRoles?.includes(userRole))
    return <Navigate exact to={redirectTo} />;
  return <Outlet />;
};

export default LoggedInRoutes;
