import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getEmployee = async () => {
  const data = await axiosInstance.get(`/employee`);
  console.log("Test", data);
  return data;
};
