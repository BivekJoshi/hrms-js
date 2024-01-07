import { axiosInstance } from '../../../auth/axiosInterceptor';

{
  /*________________________POST_____________________________________*/
}
export const addEmployeeHistory = async (formData, id) => {
  const newHis = formData?.history;
  const dataToPost = newHis?.filter(
    (item) => item.id === undefined || item.id === ''
  );
  const data = await axiosInstance.post(
    `/employment-history/create/${id}`,
    dataToPost
  );
  return data;
};

{
  /*________________________GETBYID_____________________________________*/
}
export const getEmployeeHistoryById = (id) => {
  if (id) {
    const data = axiosInstance.get(`/employment-history/emp-history-id/${id}`);
    return data;
  }
};

{
  /*________________________GETBY EMPLOYEE HISTORY ID_____________________________________*/
}
export const getEmployeeHistory = (id) => {
  if (id) {
    const data = axiosInstance.get(`/employment-history/emp-histories/${id}`);
    return data;
  }
};

export const getEmployeeEmployment = (id) => {
  if (id) {
    const data = axiosInstance.get(`/employment-history/emp-histories/${id}`);
    return data;
  }
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteEmployeeHistory = async (employeeHistoryId) => {
  if (employeeHistoryId) {
    const data = await axiosInstance.delete(
      `/employment-history/${employeeHistoryId}`
    );
    return data;
  }
};

{
  /*________________________EDIT_____________________________________*/
}
export const editEmployeeHistory = async (formData, id) => {
  const newData = formData?.history;
  const empHisId = newData && newData.map((history) => history?.id);
  const queryString = empHisId.map((HisId) => `empHisId=${HisId}`).join('&');
  const data = await axiosInstance.put(
    `/employment-history/update/${id}?${queryString}`,
    formData?.history
  );
  return data;
};

{
  /*________________________POST-FOR-VIEW-DETAIL-ADD-PORTION_____________________________________*/
}
export const addEmpHistory = async (formData, id) => {
  const postData = [formData];
  const data = await axiosInstance.post(
    `/employment-history/create/${id}`,
    postData
  );
  return data;
};
