import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getEvent = async () => {
  const data = await axiosInstance.get(`/event`);
  return data;
};

{/*________________________POST_____________________________________*/ }
export const addEvent = async (formData) => {
  const data = await axiosInstance.post('/event', formData);
  return data;
};