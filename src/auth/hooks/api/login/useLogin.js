import { useMutation } from 'react-query';
import { login } from '../../../api/login/login-api';
import { toast } from 'react-toastify';
import {
  getUser,
  removeUser,
  setUser,
} from '../../../../app/utils/cookieHelper';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation(
    ['login'],
    ({ email, password }) => login(email, password),
    {
      onSuccess: (data) => {
        setUser(data);
        toast.success('Login Successful');

        const decode = jwtDecode(data);
        const userRole = decode?.userRole;
        if (!userRole) {
          removeUser();
          navigate('/');
        } else if (
          userRole === 'ROLE_SUPER_ADMIN' ||
          userRole === 'ROLE_ADMIN' ||
          userRole === 'ROLE_MANAGER' ||
          userRole === 'ROLE_HR_ADMIN' ||
          userRole === 'ROLE_HR_CLERK'
        ) {
          navigate('/admin/dashboard');
        } else if (userRole === 'ROLE_EMPLOYEE') {
          navigate('/employee/home');
        } else {
          navigate('/');
        }
      },
    }
  );
};
