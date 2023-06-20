import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getleave = async () => {
  const data = await axiosInstance.get(`/leave`);
  return data;
};

{/*________________________GETBYID_____________________________________*/ }
export const getLeaveById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/leave/${id}`);
    return data;
  }
};

{/*________________________POST_____________________________________*/ }
export const addleave = async (formData) => {
  const submitedData = {
    ...formData,
    employeeId: formData.employeeId?.id,
    leaveTypeId: formData.leaveTypeId?.id,
  }
  const data = await axiosInstance.post('/leave', submitedData);
  return data;
};

{/*________________________EDIT_____________________________________*/ }
export const editLeave = async (formData) => {
  const submitedData = {
    ...formData,
    employeeId: formData.employeeId?.id,
    leaveTypeId: formData.leaveTypeId?.id,
  }
  const {id} = formData;
  const data = await axiosInstance.put(`/leave/${id}`, submitedData);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteLeave = async (leaveId) => {
  const response = await axiosInstance.delete(`/leave/${leaveId}`);
  return response.data;
};