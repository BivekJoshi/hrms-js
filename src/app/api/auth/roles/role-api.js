import { axiosInstance } from "../../../../auth/axiosInterceptor";

/*____________________________GET-ROLE____________________________________________*/
export const getRole = async () => {
  const data = await axiosInstance.get(`/role`);
  return data;
};

/*________________________POST_____________________________________*/
export const addRole = async (formData) => {
  const data = await axiosInstance.post("/role", formData);
  return data;
};

/*____________________________EDIT-ROLE-PERMISSION____________________________________________*/
export const editRole = async (formData) => {
  const { roleId } = formData;
  const data = await axiosInstance.post(`/role?roleId=${roleId}`, formData);
  return data;
};

/*____________________________EDIT-ROLE-PERMISSION____________________________________________*/
export const editPermissionRole = async (formData) => {
  const { roleId, permissionId } = formData;
  const data = await axiosInstance.post(
    `/role/add-permission/${roleId}?permissionId=${permissionId}`);
  return data;
};

/*________________________DELETE_____________________________________*/
export const deleteRole = async (id) => {
  const response = await axiosInstance.delete(`/role/${id}`);
  return response.data;
};