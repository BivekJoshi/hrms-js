import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getEmployee = async () => {
  const data = await axiosInstance.get(`/employee`);
  return data;
};
export const getEmployeeData = async (pageNumber) => {
  const data = await axiosInstance.get(`/employee/page-wise?pageNumber=${pageNumber}`);
  return data;
};

export const addEmployee = async (formData, getId) => {
  const data = await axiosInstance.post(`/employee`, formData)
  return data;
};

export const getEmployeeById = (id) => {
  const data = axiosInstance.get(`employee/${id}`);
  return data;
};

export const editEmployee = async (formData, id) => {
  const data = await axiosInstance.put(`/employee/${id}`, formData);
  return data;
};


export const getEmployeeByCompany = async () => {
  const data = await axiosInstance.get(`/employee/company/{companyId}`);
  return data;
};

export const getEmployeeByDesignation = async () => {
  const data = await axiosInstance.get(`/employee/position/{positionId}`);
  return data;
};

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