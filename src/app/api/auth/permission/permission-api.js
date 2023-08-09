import { axiosInstance } from "../../../../auth/axiosInterceptor";

/*____________________________GET-PERMISSION____________________________________________*/
export const getPermission = async () => {
  const data = await axiosInstance.get(`/permission`);
  return data;
};

/*____________________________GET-PERMISSION____________________________________________*/
export const getPermissionById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/permission/${id}`);
    return data;
  }
};

/*________________________POST-PERMISSION_____________________________________*/
export const addPermission = async (formData) => {
  const data = await axiosInstance.post("/permission", formData);
  return data;
};

/*________________________EDIT-PERMISSION_____________________________________*/
export const editPermission = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/permission/${id}`, formData);
  return data;
};

/*________________________DELETE--PERMISSION_____________________________________*/
export const deletePermission = async (id) => {
  const response = await axiosInstance.delete(`/permission/${id}`);
  return response.data;
};
