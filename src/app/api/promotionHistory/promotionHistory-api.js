import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getPromotionHistory = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/promotion-history/employee-id/${id}`);
    return data;
  }
};

{/*________________________POST_____________________________________*/ }
export const addPromotionHistory = async (formData,id) => {
  const data = await axiosInstance.post(`/promotion-history/create/${id}`, formData);
  return data;
};
