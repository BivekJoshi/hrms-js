import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getEvent = async () => {
  const data = await axiosInstance.get(`/event`);
  return data;
};

{/*________________________GETBYID_____________________________________*/ }
export const getEventById = async (id) => {
  const data = await axiosInstance.get(`/event/${id}`);
  return data;
};

{/*________________________POST_____________________________________*/ }
export const addEvent = async (formData) => {
  const data = await axiosInstance.post('/event', formData);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteEvent = async (eventId) => {
  const response = await axiosInstance.delete(`/event/${eventId}`);
  return response.data;
};

{/*________________________EDIT_____________________________________*/ }
export const editEvent = async (formData) => {
  const {id} = formData;
  const data = await axiosInstance.put(`/event/${id}`, formData);
  return data;
};