import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getCompany = async () => {
  const data = await axiosInstance.get(`/company`);
  return data;
};

export const addCompany = async (formData) => {
  const data = await axiosInstance.post('/company', formData);
  return data;
};
