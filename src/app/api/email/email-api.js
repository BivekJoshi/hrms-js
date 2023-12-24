import { axiosInstance } from '../../../auth/axiosInterceptor';

/*___________________SEND EMAIL FOR PERTICULAR EMPLOYEE ON BASIS OF ID______________________________________*/
export const sendEmail = async ({ formData, employeeId }) => {
  if (employeeId) {
    const data = await axiosInstance.post(
      `/email/employee-id/${employeeId}`,
      formData
    );

    return data;
  }
};

/*___________________SEND EMAIL FOR MULTIPLE EMPLOYEE ON BASIS OF ID______________________________________*/
export const sendEmailToMultipleEmployee = async ({ formData, employeeId }) => {
  const employeeIdParams = employeeId
    .map((id) => `employeeIds=${id}`)
    .join('&');
  const url = `/email/employee-ids?employeeIds=${employeeIdParams}`;
  const res = await axiosInstance.post(url, formData);
  return res;
};

/*___________________SEND EMAIL TO ALL EMPLOYEE EVENT______________________________________*/
export const sendEmailToAll = async ({ formData, employeeId, eventId }) => {
  const employeeIdParams = employeeId
    .map((id) => `employeeIds=${id}`)
    .join('&');
  const url = `/email/employee-ids/event?${employeeIdParams}&eventId=${eventId}`;
  const res = await axiosInstance.post(url, formData);
  return res;
};

/*___________________SEND EMAIL TO ALL EMPLOYEE HOLIDAY______________________________________*/
export const sendEmailForHoliday = async ({
  formData,
  employeeId,
  holidayId,
}) => {
  const employeeIdParams = employeeId
    .map((id) => `employeeIds=${id}`)
    .join('&');
  const url = `/email/employees/holiday?${employeeIdParams}&holidayId=${holidayId}`;
  const res = await axiosInstance.post(url, formData);
  return res;
};





{
  /*________________________GET_____________________________________*/
}
export const getEmailConfigure = async () => {
  const data = await axiosInstance.get(`/email/get-email-config`);
  return data;
};
{
  /*________________________POST for email congiguration_____________________________________*/
}
export const addEmailConfigure = async (formData) => {
 
  const data = await axiosInstance.put('/email/change-email-config', formData);
  return data;
};