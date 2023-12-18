import { axiosInstance } from '../../../auth/axiosInterceptor';

{
  /*________________________GET_____________________________________*/
}
export const getCompany = async () => {
  const data = await axiosInstance.get(`/branch/get-all`);
  return data;
};

{
  /*________________________GETBYID_____________________________________*/
}
export const getCompanyById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/branch/branch-id/${id}`);
    return data;
  }
};

{
  /*________________________POST_____________________________________*/
}
export const addCompany = async (formData) => {
  const data = await axiosInstance.post('/branch/create', formData);
  return data;
};

{
  /*________________________EDIT_____________________________________*/
}
export const editCompany = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/branch/update/${id}`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteCompany = async (branchId) => {
  if (branchId) {
    const response = await axiosInstance.delete(`/branch/delete/${branchId}`);
    return response.data;
  }
};
