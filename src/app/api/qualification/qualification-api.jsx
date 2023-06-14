import { axiosInstance } from '../../../auth/axiosInterceptor';

export const addQualification = async (formData) => {
  const data = await axiosInstance.post(`/qualification`, formData);
  return data;
};
