import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getDesignation = async () => {
  const data = await axiosInstance.get(`/position`);
  return data;
};