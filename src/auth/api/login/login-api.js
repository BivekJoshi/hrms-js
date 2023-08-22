import { axiosInstance } from '../../axiosInterceptor';

export const login = async (email, password) => {
  const { auth } = await axiosInstance.post('/login/public', {
    email,
    password,
  });
  return auth;
};
