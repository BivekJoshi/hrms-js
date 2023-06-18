import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getCompany = async () => {
  const data = await axiosInstance.get(`/company`);
  return data;
};

{/*________________________POST_____________________________________*/ }
export const addCompany = async (formData) => {
  const data = await axiosInstance.post('/company', formData);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteCompany = async (companyId) => {
  const response = await axiosInstance.delete(`/company/${companyId}`);
  return response.data;
};

{/*________________________EDIT_____________________________________*/ }
export const editCompany = async (formData, companyId) => {
  console.log(companyId)
  const response = await axiosInstance.put(`/company/=${companyId}`, formData);
  return response.data;
};