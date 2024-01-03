import { axiosInstance } from "../../../auth/axiosInterceptor";

{
  /*________________________GETALL_____________________________________*/
}
export const getEmployee = async () => {
  const data = await axiosInstance.get(`/employee/get-all`);
  return data;
};
{
  /*________________________GETNoneUser_____________________________________*/
}
export const getNoneUser = async () => {
  const data = await axiosInstance.get(`/employee/non-user`);
  return data;
};

{
  /*________________________GETALL_____________________________________*/
}
export const getLoggedInUserInfo = async () => {
  const data = await axiosInstance.get(`/employee/logged-in/employee-details`);
  return data;
};
export const getAllEmployeeData = async () => {
  const data = await axiosInstance.get(`/employee/get-all`);
  return data;
};

{
  /*________________________GETBYPAGINATION_____________________________________*/
}
export const getEmployeeData = async (pageNumber, pageSize) => {
  const data = await axiosInstance.get(
    `/employee/get-all-page-wise/${pageNumber}/?pageSize=${pageSize}&sortBy=id&sortDir=asc`
  );
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addEmployee = async (formData, getId) => {
  const data = await axiosInstance.post(`/employee/create`, formData);
  return data;
};

{
  /*________________________GETBYID_____________________________________*/
}
export const getEmployeeById = (id) => {
  if (id) {
    const data = axiosInstance.get(`employee/employee-id/${id}`);
    return data;
  }
};

{
  /*________________________EDIT_____________________________________*/
}
export const editEmployee = async (formData, id) => {
  if (id) {
    const data = await axiosInstance.put(`/employee/${id}`, formData);
    return data;
  }
};

{
  /*________________________GETBYCOMPANY_____________________________________*/
}
export const getEmployeeByCompany = async () => {
  const data = await axiosInstance.get(`/employee/company-id/{branchId}`);
  return data;
};

{
  /*________________________GETBYDESIGNATION_____________________________________*/
}
export const getEmployeeByDesignation = async () => {
  const data = await axiosInstance.get(`/employee/position-id/{positionId}`);
  return data;
};

{
  /*________________________GETBYDEPARTMENT_____________________________________*/
}
export const getEmployeeBydepartment = async () => {
  const data = await axiosInstance.get(
    `/employee/department-id/{departmentId}`
  );
  return data;
};

{
  /*________________________GET-DEACTTIVATED-EMPLOYEE_____________________________________*/
}
export const getDeactivatedEmployee = async () => {
  const data = await axiosInstance.get(`/employee/get-deactivated`);
  return data;
};

export const getDeactivatedUser = async () => {
  const data = await axiosInstance.get(`/user/get-deactivated-user`);
  return data;
};

{
  /*________________________EDIT-TO-DE-ACTIVATE-EMPLOYEE_____________________________________*/
}
export const removeActiveEmployee = async (formData) => {
  const { employeeId, setActivation, effectiveDate } = formData;
  const data = await axiosInstance.put(
    `/employee/edit-activation/${employeeId}?setActivation=${setActivation}&effectiveDate=${effectiveDate}`
  );
  return data;
};

{
  /*________________________EDIT-TO-ACTIVATE-EMPLOYEE_____________________________________*/
}
export const addActiveEmployee = async (formData) => {
  const { employeeId, setActivation, effectiveDate } = formData;
  const data = await axiosInstance.put(
    `/employee/edit-activation/${employeeId}?setActivation=${setActivation}&effectiveDate=${effectiveDate}`
  );
  return data;
};

{
  /*________________________PROGRESS-BAR_____________________________________*/
}
export const getEmployeeProgress = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/employee/progress-bar/${id}`);
    return data;
  }
};

{
  /*________________________EDIT-TO-DE-Terminate-EMPLOYEE_____________________________________*/
}
export const terminateEmployee = async (formData) => {
  const { employeeId, terminationType, effectiveDate } = formData;
  const data = await axiosInstance.put(
    `/employee/edit-termination/${employeeId}?terminationType=${terminationType}&effectiveDate=${effectiveDate}`
  );
  return data;
};
{
  /*________________________EDIT-TO-DE-Terminate-EMPLOYEE_____________________________________*/
}
export const activeEmployee = async (formData) => {
  const { employeeId, terminationType, effectiveDate } = formData;
  const data = await axiosInstance.put(
    `/employee/edit-termination/${employeeId}?terminationType=${terminationType}&effectiveDate=${effectiveDate}`
  );
  return data;
};

export const activateUser = async (formData) => {
  const data = await axiosInstance.put(
    `/user/set-activation/${formData?.userId}?setIsActive=true`
  );
  return data;
};
