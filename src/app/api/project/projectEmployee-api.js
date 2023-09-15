import { axiosInstance } from "../../../auth/axiosInterceptor";

/*________________________GET_____________________________________*/ 
export const getProjectEmployee = async () => {
    const data = await axiosInstance.get(`/project-employee/get-all`);
    return data;
};

/*________________________GETBYID_____________________________________*/ 
export const getProjectEmployeeById = async (projectTd) => {
      const data = await axiosInstance.get(`project-employee/project-id/${projectTd}`);
      return data;
};

/*________________________POST_____________________________________*/ 
export const addProjectEmployee = async (formData) => {
    const data = await axiosInstance.post(`/project-employee/create`, formData);
    return data;
};

/*________________________EDIT_____________________________________*/ 
export const editProjectEmployee = async (formData) => {
    const {id} = formData;
    const data = await axiosInstance.put(`/project-employee/update/${id}`, formData);
    return data;
};

/*________________________DELETE_____________________________________*/ 
export const deleteProjectEmployee = async (id) => {
    const res = await axiosInstance.delete(`/project-employee/${id}`);
    return res.data;
};

