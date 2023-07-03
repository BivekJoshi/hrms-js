import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getHoliday = async () => {
  const data = await axiosInstance.get(`/holiday`);
  return data;
};

{/*________________________GETCURRENTMONTH_____________________________________*/ }
export const getHolidayCurrent = async () => {
  const data = await axiosInstance.get(`/holiday/current-month`);
  return data;
};

{/*________________________POST_____________________________________*/ }
export const addHoliday = async (formData) => {
  const data = await axiosInstance.post('/holiday', formData);
  return data;
};