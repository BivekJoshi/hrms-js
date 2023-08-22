import { axiosInstance } from "../../../../auth/axiosInterceptor";

{
  /*____________________________GET-USER____________________________________________*/
}
export const getUserControl = async () => {
  const data = await axiosInstance.get(`/user/get-all`);
  return data;
};

{
  /*________________________GETBYID_____________________________________*/
}
export const getUserControlById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/user/user-id/${id}`);
    return data;
  }
};

{
  /*________________________POST_____________________________________*/
}
export const addUserControl = async (formData) => {
  const { employeeId, roleId } = formData;
  const data = await axiosInstance.post(`/user/create/${employeeId}?roleId=${roleId}`, formData);
  return data;
};

{
  /*________________________EDIT_____________________________________*/
}
export const editUserControl = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/user/${id}`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteCompany = async (id) => {
  const response = await axiosInstance.delete(`/user/${id}`);
  return response.data;
};

{
  /*____________________________GET-USER-ROLE____________________________________________*/
}
export const getUserRole = async () => {
  const data = await axiosInstance.get(`/role/get-all`);
  return data;
};

{
  /*____________________________POST-PERMISSION____________________________________________*/
}
export const addPermissionRole = async (formData) => {
  const { roleId, userId, addRole } = formData;
  const data = await axiosInstance.post(
    `/user/role-setting?userId=${userId}&roleId=${roleId}&addRole=${addRole}`,
    formData
  );
  return data;
};
