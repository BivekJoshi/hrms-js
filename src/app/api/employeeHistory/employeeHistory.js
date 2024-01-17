import { axiosInstance } from "../../../auth/axiosInterceptor";

{
  /*________________________POST_____________________________________*/
}
export const addEmployeeHistory = async (formData, id) => {
  const workHistoryForm = new FormData();
  // for (let key of Object.keys(formData)) {
  //   workHistoryForm.append(key, formData[key]);
  // }
  workHistoryForm.append("employerName", formData?.employerName);
  workHistoryForm.append("employerAddress", formData?.employerAddress);
  workHistoryForm.append("pastPosition", formData?.pastPosition);
  workHistoryForm.append("fromDate", formData?.fromDate);
  workHistoryForm.append("toDate", formData?.toDate);
  workHistoryForm.append("remarks", formData?.remarks);
  if (formData?.experienceLetter) {
    workHistoryForm.append("experienceLetter", formData?.experienceLetter);
  }

  const data = await axiosInstance.post(
    `/employment-history/create/${id}`,
    workHistoryForm
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
    const data = axiosInstance.get(`/employment-history/${id}`);
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
export const editEmployeeHistory = async (formData) => {
  // const newData = formData?.history;
  // const empHisId = newData && newData.map((history) => history?.id);
  // const queryString = empHisId.map((HisId) => `empHisId=${HisId}`).join('&');
  // const data = await axiosInstance.put(
  //   `/employment-history/update/${id}?${queryString}`,
  //   formData?.history
  // );
  if (formData?.id) {
    const data = await axiosInstance.put(
      `/employment-history/update/${formData?.id}`,
      formData
    );
    return data;
  }
};

export const editWorkExpirence = async (formData, id) => {
  await axiosInstance.put(`/employment-history/update-file/${id}`, formData);
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

export const addEmploymentHistory = async (formData, id) => {
  const path = formData?.multiplePosition
    ? `/employment-history/${id}?multiplePosition=true`
    : `/employment-history/${id}`;
  const data = await axiosInstance.post(path, formData);
  return data;
};

export const editEmployeeDetails = async (formData, id) => {
  const { tableId, effectiveDateTo } = formData;

  const path = `/employment-history/update-position/${tableId}?employeeId=${id}`;
  const data = await axiosInstance.put(path, {
    effectiveDateTo: effectiveDateTo,
  });
  return data;
};

export const transferEmploymentHistory = async (formData, id) => {
  const data = await axiosInstance.put(`/employment-history/${id}`, formData);
  return data;
};

export const transferUpgradeEmployee = async (formData, id) => {
  const data = await axiosInstance.put(
    `/employment-history/update-branch-department/${id}?allPosition=${formData?.allPosition}`,
    formData
  );
  return data;
};
