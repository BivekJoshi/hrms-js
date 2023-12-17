import { axiosInstance } from '../../../../auth/axiosInterceptor';

/*____________________________GET-ROLE____________________________________________*/
export const getRole = async () => {
  const data = await axiosInstance.get(`/role/get-all`);
  return data;
};

/*________________________GETBYID_____________________________________*/
export const getRoleById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/role/role-id/${id}`);
    return data;
  }
};

/*________________________POST_____________________________________*/
export const addRole = async (formData) => {
  const data = await axiosInstance.post('/role/create', formData);
  return data;
};

/*____________________________EDIT-ROLE-PERMISSION____________________________________________*/
export const editRole = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/role/update/${id}`, formData);
  return data;
};

/*____________________________EDIT-ROLE-PERMISSION____________________________________________*/
export const editPermissionRole = async (formData) => {
  const { roleId, permissionId } = formData;

  const data = await axiosInstance.put(`/role/add-permission/${roleId}`, {
    permissionId,
  });
  return data;
};

/*________________________DELETE_____________________________________*/
export const deleteRole = async (id) => {
  if (id) {
    const response = await axiosInstance.delete(`/role/delete/${id}`);
    return response.data;
  }
};
