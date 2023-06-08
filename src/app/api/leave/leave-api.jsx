import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getleave = async () => {
  const data = await axiosInstance.get(`/leave`);
  return data;
};

export const addleave = async (formData) => {
  const data = await axiosInstance.post('/leave', formData);
  return data;
};