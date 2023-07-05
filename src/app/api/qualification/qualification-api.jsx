import { axiosInstance } from '../../../auth/axiosInterceptor';

{/*________________________GETBYID_____________________________________*/ }
export const getQualificationById = async (id) => {
  if (id) {
    const data = axiosInstance.get(`/qualification/employee/${id}`);
    return data;
  }
};

{/*________________________POST_____________________________________*/ }
export const addQualification = async (formData, id) => {
  const data = await axiosInstance.post(
    `/qualification/create/${id}`,
    formData?.education
  );
  return data;
};

{/*________________________EDIT_____________________________________*/ }
export const editQualification = async (formData, id) => {
  // const {id} = formData
  const data = await axiosInstance.put(`/qualification/${id}`, formData?.education);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteQualifiaction = async (qualificationId) => {
  const data = await axiosInstance.delete(`/qualification/${qualificationId}`);
  return data;
}