import { axiosInstance } from "../../../auth/axiosInterceptor";

export const addfamily = async (formData, id) => {
  const data = await axiosInstance.post(`/family-member/${id}`, formData?.family);
  return data;
};