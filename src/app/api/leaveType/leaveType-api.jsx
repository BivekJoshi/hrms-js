import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getLeaveType = async () => {
  const data = await axiosInstance.get(`/leave-type`);
  return data;
};

export const addLeaveType = async (formData) => {
  const data = await axiosInstance.post('/leave-type', formData);
  return data;
};