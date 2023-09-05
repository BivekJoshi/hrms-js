import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________POST_____________________________________*/ }
export const addfamily = async (formData, id) => {
  const data = await axiosInstance.post(`/family-member/create/${id}`, formData?.family);
  return data;
};

{/*________________________GETBYID_____________________________________*/ }
export const getFamilyById = (id) => {
  if (id) {
    const data = axiosInstance.get(`/family-member/employee-id/${id}`);
    return data;
  }
};

{/*________________________EDIT_____________________________________*/ }
export const editFamily = async (formData, id) => {
  const data = await axiosInstance.put(`/family-member/update/${id}`, formData?.family);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteFamily = async (memberId) => {
  const data = await axiosInstance.delete(`/family-member/delete/${memberId}`);
  return data;
};