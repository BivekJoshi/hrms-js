import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getDashboard = async () => {
  const data = await axiosInstance.get(`/employee/dashboard-items`);
  return data;
};

{/*________________________GET-PROJECT_COUNT_____________________________________*/ }
export const getProjectCount = async () => {
  const data = await axiosInstance.get(`/project/count`);
  return data;
};