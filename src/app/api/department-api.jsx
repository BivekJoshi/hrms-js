import { axiosInstance } from "../../auth/axiosInterceptor";

export const getDepartment = async () => {
  const data = await axiosInstance.get(`/department`);
  return data;
};