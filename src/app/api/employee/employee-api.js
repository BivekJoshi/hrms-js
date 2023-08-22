import { axiosInstance } from '../../../auth/axiosInterceptor';

{/*________________________GETALL_____________________________________*/ }
export const getEmployee = async () => {
  const data = await axiosInstance.get(`/employee/get-all`);
  return data;
};

{/*________________________GETBYPAGINATION_____________________________________*/ }
export const getEmployeeData = async (pageNumber) => {
  const data = await axiosInstance.get(`/employee/page-wise?pageNumber=${pageNumber}`);
  return data;
};

{/*________________________POST_____________________________________*/ }
export const addEmployee = async (formData, getId) => {
  const data = await axiosInstance.post(`/employee`, formData)
  return data;
};

{/*________________________GETBYID_____________________________________*/ }
export const getEmployeeById = (id) => {
  const data = axiosInstance.get(`employee/${id}`);
  return data;
};

{/*________________________EDIT_____________________________________*/ }
export const editEmployee = async (formData, id) => {
  const data = await axiosInstance.put(`/employee/${id}`, formData);
  return data;
};

{/*________________________GETBYCOMPANY_____________________________________*/ }
export const getEmployeeByCompany = async () => {
  const data = await axiosInstance.get(`/employee/company/{companyId}`);
  return data;
};

{/*________________________GETBYDESIGNATION_____________________________________*/ }
export const getEmployeeByDesignation = async () => {
  const data = await axiosInstance.get(`/employee/position/{positionId}`);
  return data;
};

{/*________________________GETBYDEPARTMENT_____________________________________*/ }
export const getEmployeeBydepartment = async () => {
  const data = await axiosInstance.get(`/employee/department/{departmentId}`);
  return data;
};

{/*________________________GET-DEACTTIVATED-EMPLOYEE_____________________________________*/ }
export const getDeactivatedEmployee = async () => {
  const data = await axiosInstance.get(`/employee/deactivated`);
  return data;
};


{/*________________________EDIT-TO-DE-ACTIVATE-EMPLOYEE_____________________________________*/ }
export const removeActiveEmployee = async (formData) => {
  const { employeeId, setActivation, effectiveDate } = formData;
  const data = await axiosInstance.put(`/employee/edit-activation/${employeeId}?setActivation=${setActivation}&effectiveDate=${effectiveDate}`);
  return data;
};

{/*________________________EDIT-TO-ACTIVATE-EMPLOYEE_____________________________________*/ }
export const addActiveEmployee = async (formData) => {
  const { employeeId, setActivation, effectiveDate } = formData;
  const data = await axiosInstance.put(`/employee/edit-activation/${employeeId}?setActivation=${setActivation}&effectiveDate=${effectiveDate}`);
  return data;
};

{/*________________________PROGRESS-BAR_____________________________________*/ }
export const getEmployeeProgress = async (id) => {
  const data = await axiosInstance.get(`/employee/progress-bar/${id}`)
  return data;
};