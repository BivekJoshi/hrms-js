import { axiosInstance } from "../../../../auth/axiosInterceptor";


{/*____________________________GET-USER____________________________________________*/}
export const getUserControl = async () => {
    const data = await axiosInstance.get(`/user`);
    return data;
};
  
  {/*________________________GETBYID_____________________________________*/ }
  export const getUserControlById = async (id) => {
    if (id) {
      const data = await axiosInstance.get(`/user/${id}`);
      return data;
    }
  };
  
  {/*________________________POST_____________________________________*/ }
  export const addUserControl = async (formData) => {
    const data = await axiosInstance.post('/user', formData);
    return data;
  };
  
  {/*________________________EDIT_____________________________________*/ }
  export const editUserControl = async (formData) => {
    const {id} = formData;
    const data = await axiosInstance.put(`/company/${id}`, formData);
    return data;
  };
  
  {/*________________________DELETE_____________________________________*/ }
  export const deleteCompany = async (id) => {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  };






{/*____________________________ROLE-API____________________________________________*/}


  {/*____________________________GET-USER-ROLE____________________________________________*/}
export const getUserRole = async () => {
  const data = await axiosInstance.get(`/role`);
  return data;
};


  {/*____________________________POST-PERMISSION____________________________________________*/}
  export const addPermissionRole = async (formData) => {
    console.log(formData)
    const {roleId, userId, addRole } = formData;
    const data = await axiosInstance.post(`/user/role-setting?userId=${userId}&roleId=${roleId}&addRole=${addRole}`, formData);
    return data;
  };