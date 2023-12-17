import { axiosInstance } from '../../../auth/axiosInterceptor';

{
  /*________________________GET_____________________________________*/
}
export const getCompany = async () => {
  const data = await axiosInstance.get(`/company/get-all`);
  return data;
};

{
  /*________________________GETBYID_____________________________________*/
}
export const getCompanyById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/company/company-id/${id}`);
    return data;
  }
};

{
  /*________________________POST_____________________________________*/
}
export const addCompany = async (formData) => {
  const data = await axiosInstance.post('/company/create', formData);
  return data;
};

{
  /*________________________EDIT_____________________________________*/
}
export const editCompany = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/company/update/${id}`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteCompany = async (companyId) => {
  if (companyId) {
    const response = await axiosInstance.delete(`/company/delete/${companyId}`);
    return response.data;
  }
};
