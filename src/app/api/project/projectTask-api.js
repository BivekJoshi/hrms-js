import { axiosInstance } from "../../../auth/axiosInterceptor";

/*________________________GET TASK LOGGEDIN USER_____________________________________*/ 
export const getTaskLoggedInUser = async () => {
  const data = await axiosInstance.get(`/project-task/logged-in/user`);
  return data;
};

/*________________________GET PROJECT TASK BY PROJECT ID_____________________________________*/
export const getProjectTask = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/project-task/project-id/${id}`);
    return data;
  }
};

/*________________________GET PROJECT TASK BY TASK ID_____________________________________*/
export const getProjectTaskByTaskId = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/project-task/project-task/${id}`);
    return data;
  }
};

{/*________________________ADD-REMOVE PROJECT EMPLOYEE PROJECT TASK_____________________________________*/ }
export const editAssignTaskToEmployee = async (formData,id) => {
  const data = await axiosInstance.put(`/project-employee/add-remove-project-employee/${id}`, formData);
  return data;
};

{/*________________________DELETE PROJECT TASK BY TASK ID_____________________________________*/ }
export const deleteProjectTask = async (taskId) => {
  const response = await axiosInstance.delete(`/project-task/delete/${taskId}`);
  return response.data;
};

/*________________________POST TASK_____________________________________*/ 
export const addProjectCreateTask = async (formData) => {
  const data = await axiosInstance.post(`/project-task/create`, formData);
  return data;
};

/*________________________POST TASK_____________________________________*/ 
export const addTaskAssignProject = async (formData,taskId) => {
  const data = await axiosInstance.post(`/project-task/update/${taskId}`, formData);
  return data;
};