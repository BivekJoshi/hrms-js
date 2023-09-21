import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getHoliday = async () => {
  const data = await axiosInstance.get(`/holiday/get-all`);
  return data;
};

{/*________________________GETBYID_____________________________________*/ }
export const getHolidayById = async (id) => {
  const data = await axiosInstance.get(`/holiday/holiday-id/${id}`);
  return data;
};

{/*________________________GET BY MONTH DATA_____________________________________*/ }
export const getHolidayByMonth = async (monthAd) => {
  const data = await axiosInstance.get(`/holiday/holidays/this-month?monthAd=${monthAd}`);
  return data;
};

{/*________________________POST_____________________________________*/ }
export const addHoliday = async (formData) => {
  const data = await axiosInstance.post('/holiday/create', formData);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteHoliday = async (holidayId) => {
  const response = await axiosInstance.delete(`/holiday/delete/${holidayId}`);
  return response.data;
};

{/*________________________EDIT_____________________________________*/ }
export const editHoliday = async (formData) => {
  const {id} = formData;
  const data = await axiosInstance.put(`/holiday/update/${id}`, formData);
  return data;
};