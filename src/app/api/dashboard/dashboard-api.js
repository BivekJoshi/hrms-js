import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getDashboard = async () => {
  const data = await axiosInstance.get(`/dashboard/dashboard-items`);
  return data;
};
