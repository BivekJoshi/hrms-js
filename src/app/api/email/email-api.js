import { axiosInstance } from "../../../auth/axiosInterceptor";

export const sendEmail = async ({ formData, employeeId }) => {
  const data = await axiosInstance.post(
    `/employee/send-email/${employeeId}`,
    formData
  );

  return data;
};


export const sendEmailToAll = async ({ formData, employeeId, eventId }) => {
  const employeeIdParams = employeeId.map((id) => `employeeIds=${id}`).join("&");
  const url = `/email/employees/event?${employeeIdParams}&eventId=${eventId}`;
  const res = await axiosInstance.post(url, formData);
  return res;
};