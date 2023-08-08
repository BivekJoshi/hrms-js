import { axiosInstance } from "../../../../auth/axiosInterceptor";

/*____________________________GET-ROLE____________________________________________*/
export const getRole = async () => {
  const data = await axiosInstance.get(`/role`);
  return data;
};

/*________________________GETBYID_____________________________________*/
export const getRoleById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/role/${id}`);
    return data;
  }
};

/*________________________POST_____________________________________*/
export const addRole = async (formData) => {
  const data = await axiosInstance.post("/role", formData);
  return data;
};

/*____________________________EDIT-ROLE-PERMISSION____________________________________________*/
export const editRole = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/role/${id}`, formData);
  return data;
};

/*____________________________EDIT-ROLE-PERMISSION____________________________________________*/
export const editPermissionRole = async (formData) => {
  const { roleId, permissionId } = formData;
  
  const data = await axiosInstance.put(
    `/role/add-permission/${roleId}`, { permissionId });
  return data;
};

/*________________________DELETE_____________________________________*/
export const deleteRole = async (id) => {
  const response = await axiosInstance.delete(`/role/${id}`);
  return response.data;
};