import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getTodayBirthday = async () => {
  const data = await axiosInstance.get(
    `/birthday-notification/today-birthdays`
  );

  return data;
};

export const getUpcomingBirthday = async () => {
  const data = await axiosInstance.get(
    `/birthday-notification/upcoming-birthdays`
  );
  return data;
};

export const removeNotification = async () => {
  const data = await axiosInstance.put(`/birthday-notification/check-birthday`);
  return data;
};

export const remmoveNotification = async () => {
  const data = await axiosInstance.put(`/birthday-notification/check-birthday`);
  return data;
};
