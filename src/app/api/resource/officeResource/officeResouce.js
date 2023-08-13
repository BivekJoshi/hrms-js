import { axiosInstance } from "../../../../auth/axiosInterceptor";

{/*________________________GET ALL OFFICE RESOURCE_____________________________________*/ }
export const getofficeResource = async () => {
  const data = await axiosInstance.get(`/office-resource/all`);
  return data;
};

{/*________________________GET OFFICE RESOURCE BY OFFICE RESOURCE ID_____________________________________*/ }
export const getofficeResourceById = async (id) => {
  const data = await axiosInstance.get(`/office-resource/${id}`);
  return data;
};

{/*________________________POST OFFICE RESOURCE_____________________________________*/ }
export const addofficeResource = async (formData) => {
  const data = await axiosInstance.post(`/office-resource`, formData);
  return data;
};

{/*________________________EDIT OFFICE RESOURCE_____________________________________*/ }
export const editofficeResource = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/office-resource/${id}`, formData);
  return data;
};

{/*________________________EDIT OFFICE RESOURCE ACTIVE-INACTIVE_____________________________________*/ }
export const editofficeResourceActiveInactive = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/office-resource/set-activation/${id}`, formData);
  return data;
};
