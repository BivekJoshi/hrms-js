import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________POST_____________________________________*/ }
export const addEmployeeHistory = async (formData, id) => {
    const data = await axiosInstance.post(`/employment-history/create/${id}`, formData?.history);
    return data;
};

{/*________________________GETBYID_____________________________________*/ }
export const getEmployeeHistoryById = (id) => {
    if (id) {
        const data = axiosInstance.get(`/employment-history/emp-history-id/${id}`);
        return data;
    }
};

{/*________________________GETBY EMPLOYEE HISTORY ID_____________________________________*/ }
export const getEmployeeHistory = (id) => {
    if (id) {
        const data = axiosInstance.get(`/employment-history/emp-histories/${id}`);
        return data;
    }
};

{/*________________________DELETE_____________________________________*/ }
export const deleteEmployeeHistory = async (employeeHistoryId) => {
    const data = await axiosInstance.delete(`/employment-history/${employeeHistoryId}`);
    return data;
};

{/*________________________EDIT_____________________________________*/ }
export const editEmployeeHistory = async (formData, id) => {
    const data = await axiosInstance.put(`/employment-history/update/${id}`, formData?.history);
    return data;
};