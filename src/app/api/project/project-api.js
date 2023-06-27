import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getProject = async () => {
    const data = await axiosInstance.get(`/project`);
    return data;
};

{/*________________________GETBYID_____________________________________*/ }
export const getProjectById = async (id) => {
    if (id) {
      const data = await axiosInstance.get(`/project/${id}`);
      return data;
    }
};

{/*________________________POST_____________________________________*/ }
export const addProject = async (formData) => {
    const data = await axiosInstance.post(`/project`, formData);
    return data;
};

{/*________________________EDIT_____________________________________*/ }
export const editProject = async (formData) => {
    const {id} = formData;
    const data = await axiosInstance.put(`/project/${id}`, formData);
    return data;
};

{/*________________________DELETE_____________________________________*/ }
export const deleteProject = async () => {
    const data = await axiosInstance.delete(`/project/deactivate/${id}`);
    return data;
};