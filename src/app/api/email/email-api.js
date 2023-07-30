import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*___________________SEND EMAIL FOR PERTICULAR EMPLOYEE ON BASIS OF ID______________________________________*/}
export const sendEmail = async ({ formData, employeeId }) => {
  const data = await axiosInstance.post(
    `/employee/email/employee/${employeeId}`,
    formData
  );

  return data;
};

{/*___________________SEND EMAIL TO ALL EMPLOYEE______________________________________*/}
export const sendEmailToAll = async ({ formData, employeeId, eventId }) => {
  console.log({"formData": formData, "employeeId": employeeId, "event": eventId})
  const employeeIdParams = employeeId.map((id) => `employeeIds=${id}`).join("&");
  const url = `/email/employees/event?${employeeIdParams}&eventId=${eventId}`;
  const res = await axiosInstance.post(url, formData);
  return res;
};