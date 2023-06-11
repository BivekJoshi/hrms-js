import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getUser, removeUser } from '../app/utils/cookieHelper';

const ProtectedRoute = ({ redirectTo }) => {
  const navigate = useNavigate();
  const user = getUser();
  useEffect(() => {
    if (!user || !user.token) {
      removeUser();
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user || !user.token) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
