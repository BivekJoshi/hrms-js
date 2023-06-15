import { axiosInstance } from '../../../auth/axiosInterceptor';

export const addQualification = async (formData, id) => {
  const data = await axiosInstance.post(`/qualification/${id}`, formData?.education);
  return data;
};
