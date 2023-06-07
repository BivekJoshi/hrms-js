import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getCompany = async () => {
  const data = await axiosInstance.get(`/company`);
  return data;
};
