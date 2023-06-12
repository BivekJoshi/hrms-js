import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getDepartment = async () => {
  const data = await axiosInstance.get(`/department`);
  return data;
};

export const addDepartment = async (formData) => {
  const data = await axiosInstance.post('/department', formData);
  return data;
};