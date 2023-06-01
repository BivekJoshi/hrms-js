import { useMutation } from 'react-query';
import { setUser } from '../../../../app/utils/cookieHelper';
import { login } from '../../../api/login/login-api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useLogin = ({ onSuccess }) => {
  const navigate = useNavigate();
  return useMutation(
    ['login'],
    ({ email, password }) => login(email, password),
    {
      onSuccess: (data, variables, context) => {
        navigate('/admin');
        toast.success('Login Successful');

        setUser({
          token: data,
        });
      },
    }
  );
};
