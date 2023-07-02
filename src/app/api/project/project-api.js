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

{/*________________________GET-DEACTIVATE-PROJECT_____________________________________*/ }
export const getDeactivatedProject = async () => {
    const data = await axiosInstance.get(`/project/get-deactivated-projects`);
    return data;
};

{/*________________________EDIT-TO-ACTIVATE-PROJECT_____________________________________*/ }
export const addActiveProject = async (formData) => {
    const { id } = formData;
    const data = await axiosInstance.post(`/project/activate/${id}`, formData);
    return data;
};

{/*________________________EDIT-TO-DE-ACTIVATE-PROJECT_____________________________________*/ }
export const removeActiveProject = async (formData) => {
    const { id } = formData;
    const data = await axiosInstance.put(`/project/change-activation-status/${id}`, formData);
    return data;
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
export const deleteProject = async (id) => {
    const data = await axiosInstance.delete(`/project/deactivate/${id}`);
    return data;
};