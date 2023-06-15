import { axiosInstance } from '../../../auth/axiosInterceptor';

export const addPermanentAddress = async (formData, id) => {
  const data = await axiosInstance.post(`/address/${id}`, formData);
  return data;
};

export const addTemporaryAddress = async (formData, id) => {
  const data = await axiosInstance.post(`/address/temporary/${id}`, formData);
  return data;
};

export const getAddressById = (id) => {
  const data = axiosInstance.get(`/address/employee/${id}`);
  console.log(data)
  return data;
};