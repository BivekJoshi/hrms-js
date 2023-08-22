import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET ALL_____________________________________*/ }
export const getleave = async () => {
  const data = await axiosInstance.get(`/leave/get-all`);
  return data;
};

{/*________________________GET PENDING LEAVE_____________________________________*/ }
export const getpendingleave = async () => {
  const data = await axiosInstance.get(`/leave/leaves-pending`);
  return data;
};

{/*________________________GETEMPLOYEELEAVEBYID_____________________________________*/ }
export const getEmployeeLeaveById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/leave/employee-id/${id}`);
    return data;
  }
};

{/*________________________GETLEAVEBYID_____________________________________*/ }
export const getLeaveById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/leave/leave-id/${id}`);
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
  const data = await axiosInstance.post('/leave/create', submitedData);
  return data;
};

{/*________________________EDIT_____________________________________*/ }
export const editLeave = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/leave/update/${id}`, formData);
  return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteLeave = async (leaveId) => {
  const response = await axiosInstance.delete(`/leave/${leaveId}`);
  return response.data;
};