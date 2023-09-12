import { axiosInstance } from "../../../auth/axiosInterceptor";

/*________________________GETBYID_____________________________________*/
export const getProjectTask = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/project-employee/task/project-id/${id}`);
    return data;
  }
};
