import { axiosInstance } from "../../../auth/axiosInterceptor";

export const sendEmail = async ({ formData, employeeId }) => {
  const data = await axiosInstance.post(
    `/employee/send-email/${employeeId}`,
    formData
  );

  return data;
};

export const sendEmailToAll = async ({ formData }) => {
  const data = await axiosInstance.post(
    `/employee/send-email/employee-list`,
    formData
  );

  return data;
};

