import { axiosInstance } from "../../../auth/axiosInterceptor";

/*________________________GET_____________________________________*/ 
export const getProjectEmployee = async () => {
    const data = await axiosInstance.get(`/project-employee/get-all`);
    return data;
};

/*________________________GETBYID_____________________________________*/ 
export const getProjectEmployeeById = async (id) => {
      const data = await axiosInstance.get(`project-employee/project-id/${id}`);
      return data;
};

/*________________________GET TASK ID_____________________________________*/ 
export const getProjectEmployeeTaskById = async (projectId) => {
    const data = await axiosInstance.get(`project-employee/project-id/${projectId}`);
    return data;
};

/*________________________POST_____________________________________*/ 
export const addProjectEmployee = async (formData) => {
    const data = await axiosInstance.post(`/project-employee/create`, formData);
    return data;
};

/*________________________POST TASK_____________________________________*/ 
export const addProjectEmployeeCreateTask = async (formData) => {
    const data = await axiosInstance.post(`/project-employee/create-task`, formData);
    return data;
};

/*________________________POST UPDATE TASK_____________________________________*/ 
export const addProjectEmployeeUpdateTask = async (formData) => {
    const data = await axiosInstance.post(`/project-employee/update-task/${taskId}`, formData);
    return data;
};

/*________________________EDIT_____________________________________*/ 
export const editProjectEmployee = async (formData) => {
    const {id} = formData;
    const data = await axiosInstance.put(`/project-employee/update/${id}`, formData);
    return data;
};

/*________________________EDIT PROJECT ADD REMOVE TASK ID_____________________________________*/ 
export const editProjectEmployeeAddRemoveTaskId = async (formData) => {
    const {projectTaskId} = formData;
    const data = await axiosInstance.put(`/project-employee/add-remove-project-employee/${projectTaskId}`, formData);
    return data;
};

/*________________________DELETE_____________________________________*/ 
export const deleteProjectEmployee = async (id) => {
    const res = await axiosInstance.delete(`/project-employee/${id}`);
    return res.data;
};

/*________________________GET TASK Logged-In User_____________________________________*/ 
export const getProjectEmployeeTaskByLoggedInUser = async () => {
    const data = await axiosInstance.get(`project-task/logged-in/user`);
    return data;
};
