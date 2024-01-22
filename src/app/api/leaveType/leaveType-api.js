import { axiosInstance } from "../../../auth/axiosInterceptor";

{
  /*________________________GET_____________________________________*/
}
export const getLeaveType = async () => {
  const data = await axiosInstance.get(`/leave-type/all-active`);
  return data;
};

{
  /*________________________GET BY ACTIVE STATUS_____________________________________*/
}
export const getAllLeaveType = async () => {
  const data = await axiosInstance.get(
    `/leave-type/by-active-status?isActive=false`
  );
  return data;
};

{
  /*________________________GETBYID_____________________________________*/
}
export const getLeaveTypeById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/leave-type/${id}`);
    return data;
  }
};

{
  /*________________________POST_____________________________________*/
}
export const addLeaveType = async (formData) => {
  const data = await axiosInstance.post("/leave-type/create", formData);
  return data;
};

{
  /*________________________EDIT_____________________________________*/
}
export const editLeaveType = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/leave-type/update/${id}`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteLeaveType = async (rowData) => {
  const { id, deletable } = rowData;
  if (deletable) {
    const response = await axiosInstance.delete(
      `/leave-type/set-activation/${id}?isActive=false`
    );
    return response.data;
  } else {
    const response = await axiosInstance.delete(
      `/leave-type/set-activation/${id}?isActive=true`
    );
    return response.data;
  }
};

{
  /*________________________DELETE_____________________________________*/
}
export const deactivateLeaveType = async ({data}) => {
  const { id } = data;
  const response = await axiosInstance.delete(
    `/leave-type/set-activation/${id}?isActive=false`
  );
  return response.data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const activateLeaveType = async ({data}) => {
  const { id } = data;
    const response = await axiosInstance.delete(
      `/leave-type/set-activation/${id}?isActive=true`
    );
    return response.data;
};
