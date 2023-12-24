import { axiosInstance } from '../../../../auth/axiosInterceptor';

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
  if (employeeId) {
    const data = await axiosInstance.post(
      `/user/create/${employeeId}`,
      formData
    );
    return data;
  }
};

{
  /*________________________EDIT_____________________________________*/
}
export const editUserControlRoleSetting = async (formData, userId, roleId) => {
  const data = await axiosInstance.put(
    `/user/role-setting?userId=${formData?.userId}&roleId=${formData?.roleId}`
  );
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteUser = async (id) => {
  const response = await axiosInstance.put(
    `/user/set-activation/${id}?setIsActive=false`
  );
  return response.data;
};

{
  /*____________________________GET-USER-ROLE____________________________________________*/
}
export const getUserRole = async () => {
  const data = await axiosInstance.get(`/role/get-all`);
  return data;
};
