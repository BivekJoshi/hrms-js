import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getEmailLogByFilter = async (userId, id) => {
  if (id) {
    const data = await axiosInstance.get(`/email-log?userId=${id}`);
    return data;
  } else if (userId) {
    const data = await axiosInstance.get(`/email-log?userId=${userId}`);
    return data;
  } else {
    const data = await axiosInstance.get(`/email-log`);
    return data;
  }
};

export const postResentEmail = async (formData,passId) => {
  const data = await axiosInstance.post(`/user/resend-email?userId=${passId}&emailType=CREATE_USER`, formData);
  return data;
};