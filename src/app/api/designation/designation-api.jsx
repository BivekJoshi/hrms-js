import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getDesignation = async () => {
  const data = await axiosInstance.get(`/position`);
  return data;
};

export const addDesignation = async (formData) => {
  const data = await axiosInstance.post('/position', formData);
  return data;
};