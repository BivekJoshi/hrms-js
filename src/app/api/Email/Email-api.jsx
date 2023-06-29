import { axiosInstance } from "../../../auth/axiosInterceptor";

export const sendEmail = async (formData) => {
  const data = await axiosInstance.post(
    "/employee/send-email/{employeeId}",
    formData
  );
  return data;
};
