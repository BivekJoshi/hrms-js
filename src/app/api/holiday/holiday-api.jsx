import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getHoliday = async () => {
  const data = await axiosInstance.get(`/holiday`);
  return data;
};

{/*________________________POST_____________________________________*/ }
export const addHoliday = async (formData) => {
  const data = await axiosInstance.post('/holiday', formData);
  return data;
};