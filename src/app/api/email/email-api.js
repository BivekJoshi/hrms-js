import { axiosInstance } from "../../../auth/axiosInterceptor";
import { useGetEmployee } from "../../hooks/employee/useEmployee";

export const sendEmail = async ({ formData, employeeId }) => {
  const data = await axiosInstance.post(
    `/employee/send-email/${employeeId}`,
    formData
  );

  return data;
};


export const sendEmailToAll = async ({ formData, employeeId }) => {
  const employeeIdParams = employeeId.map((id) => `employeeIds=${id}`).join("&");
  const url = `/employee/send-email/employee-list?${employeeIdParams}`;
  const res = await axiosInstance.post(url, formData);
  return res;
};