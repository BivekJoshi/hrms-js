import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getTodayBirthday = async () => {
  const data = await axiosInstance.get(`/birthday-notification/today-birthdays`);
  // console.log("Test", data);
  return data;
};

export const getUpcomingBirthday = async () => {
  const data = await axiosInstance.get(`/birthday-notification/upcoming-birthdays`);
  return data;
};
