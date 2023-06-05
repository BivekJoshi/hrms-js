import { axiosInstance } from '../../axiosInterceptor';

export const login = async (email, password) => {
  const { auth } = await axiosInstance.post('/public/login', {
    email,
    password,
  });
  return auth;
};
