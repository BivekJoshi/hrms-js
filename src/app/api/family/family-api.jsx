import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________POST_____________________________________*/ }
export const addfamily = async (formData, id) => {
  const data = await axiosInstance.post(`/family-member/${id}`, formData?.family);
  return data;
};

{/*________________________GETBYID_____________________________________*/ }
export const getFamilyById = (id) => {
  if (id) {
    const data = axiosInstance.get(`/family-member/${id}`);
    return data;
  }
};

{/*________________________EDIT_____________________________________*/ }
export const editFamily = async (formData, memberId) => {
  const {id} = formData
  const data = await axiosInstance.put(`/family-member/${id}`, formData);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteFamily = async (memberId) => {
  const data = await axiosInstance.delete(`/family-member/${memberId}`);
  return data;
};