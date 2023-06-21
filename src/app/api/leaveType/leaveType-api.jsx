import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getLeaveType = async () => {
  const data = await axiosInstance.get(`/leave-type`);
  return data;
};

{/*________________________GETBYID_____________________________________*/ }
export const getLeaveTypeById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/leave-type/${id}`);
    return data;
  }
};

{/*________________________POST_____________________________________*/ }
export const addLeaveType = async (formData) => {
  const data = await axiosInstance.post('/leave-type', formData);
  return data;
};

{/*________________________EDIT_____________________________________*/ }
export const editLeaveType = async (formData) => {
  const {id} = formData;
  const data = await axiosInstance.put(`/leave-type/${id}`, formData);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteLeaveType = async (leavetypeId) => {
  const response = await axiosInstance.delete(`/leave-type/${leavetypeId}`);
  return response.data;
};