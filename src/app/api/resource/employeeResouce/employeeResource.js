import { axiosInstance } from "../../../../auth/axiosInterceptor";

{/*________________________GET ALL EMPLOYEE RESOURCE_____________________________________*/ }
export const getemployeeResource = async () => {
  const data = await axiosInstance.get(`/employee-resource/get-all`);
  return data;
};

{/*________________________GET OFFICE RESOURCE BY EMPLOYEE RESOURCE ID_____________________________________*/ }
export const getemployeeResourceById = async (id) => {
  const data = await axiosInstance.get(`/employee-resource/get/${id}`);
  return data;
};

{/*________________________POST EMPLOYEE RESOURCE_____________________________________*/ }
export const addemployeeResource = async (id) => {
  const data = await axiosInstance.post(`/employee-resource`);
  console.log(data,"datahai ma");
  return data;
};

{/*________________________EDIT EMPLOYEE RESOURCE_____________________________________*/ }
export const editemployeeResource = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/employee-resource/${id}`, formData);
  return data;
};

{/*________________________DELETE EMPLOYEE RESOURCE_____________________________________*/ }
export const deleteemployeeResource = async (empResId) => {
    const response = await axiosInstance.delete(`/employee-resource/${empResId}`);
    return response.data;
  };
