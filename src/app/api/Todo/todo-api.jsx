import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getList = async () => {
  const data = await axiosInstance.get(`/to-do-list/get-all-by-user`);
  return data;
};

// {/*________________________GETBYUSERID_____________________________________*/ }
// export const getListByUserId = async (id) => {
//   if (id) {
//     const data = await axiosInstance.get(`/to-do-list/get-by-id/${id}`);
//     return data;
//   }
// };

{/*________________________GETBYID_____________________________________*/ }
export const getListById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/to-do-list/get-by-id/${id}`);
    return data;
  }
};

{/*________________________POST_____________________________________*/ }
export const addList = async (formData) => {
  const data = await axiosInstance.post('/to-do-list', formData);
  return data;
};

{/*________________________EDIT_____________________________________*/ }
export const editList = async (formData) => {
  const {id} = formData;
  const data = await axiosInstance.put(`/to-do-list/edit/${id}`, formData);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteList = async (companyId) => {
  const response = await axiosInstance.delete(`/to-do-list/delete/${companyId}`);
  return response.data;
};