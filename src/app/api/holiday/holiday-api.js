import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getHoliday = async () => {
  const data = await axiosInstance.get(`/holiday`);
  return data;
};

{/*________________________GETBYID_____________________________________*/ }
export const getHolidayById = async (id) => {
  const data = await axiosInstance.get(`/holiday/${id}`);
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

{/*________________________DELETE_____________________________________*/ }
export const deleteHoliday = async (holidayId) => {
  const response = await axiosInstance.delete(`/holiday/${holidayId}`);
  return response.data;
};

{/*________________________EDIT_____________________________________*/ }
export const editHoliday = async (formData) => {
  const {id} = formData;
  const data = await axiosInstance.put(`/holiday/${id}`, formData);
  return data;
};