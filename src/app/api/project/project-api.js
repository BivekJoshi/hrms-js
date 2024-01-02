import { axiosInstance } from "../../../auth/axiosInterceptor";

{
  /*________________________GET_____________________________________*/
}
export const getProject = async () => {
  const data = await axiosInstance.get(`/project/get-all`);
  return data;
};
{
  /*________________________GET Project Detail_____________________________________*/
}
export const getProjectDetail = async () => {
  const data = await axiosInstance.get(`/project/get-all-project-details`);
  return data;
};
/*________________________GETBYPAGINATION_____________________________________*/
export const getProjectPageWise = async (pageNumber, pageSize) => {
  const data = await axiosInstance.get(
    `/project/get-all-page-wise/${pageNumber}/?pageSize=${pageSize}&sortBy=id&sortDir=asc`
  );
  return data;
};

{
  /*________________________GETBYID_____________________________________*/
}
export const getProjectById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/project/project-id/${id}`);
    return data;
  }
};

{
  /*________________________GET PROJECT INVOLVEMENT BY EMPLOYEE ID_____________________________________*/
}
export const getProjectByEmployeeIdInvolved = async (employeeId) => {
  if (employeeId) {
    const data = await axiosInstance.get(`/project/employee-id/${employeeId}`);
    return data;
  }
};

{
  /*________________________GET-DEACTIVATE-PROJECT_____________________________________*/
}
export const getDeactivatedProject = async () => {
  const data = await axiosInstance.get(`/project/get-deactivated`);
  return data;
};

{
  /*________________________GET-PROJECT_WISE_EMPLOYEE_____________________________________*/
}
export const getProjectWiseEmployee = async (employeeId) => {
  const data = await axiosInstance.get(
    `/project/project-wise-employees/${employeeId}`
  );
  return data;
};

{
  /*________________________EDIT-TO-ACTIVATE-PROJECT_____________________________________*/
}
export const addActiveProject = async (formData) => {
  const { projectId } = formData;
  const data = await axiosInstance.put(
    `/project/change-activation-status/${projectId}?isActive=true`
  );
  return data;
};

{
  /*________________________EDIT-TO-DE-ACTIVATE-PROJECT_____________________________________*/
}
export const removeActiveProject = async (formData) => {
  const { projectId } = formData;
  const data = await axiosInstance.put(
    `/project/change-activation-status/${projectId}?isActive=false`
  );
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addProject = async (formData) => {
  const data = await axiosInstance.post("/project/create", formData);
  return data;
};

{
  /*________________________EDIT_____________________________________*/
}
export const editProject = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/project/update/${id}`, formData);
  return data;
};
