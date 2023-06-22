import { axiosInstance } from '../../../auth/axiosInterceptor';

export const addPermanentAddress = async (formData, id) => {
  const data = await axiosInstance.post(`/address/${id}`, formData.addresses);
  return data;
};

export const addTemporaryAddress = async (formData, id) => {
  const data = await axiosInstance.post(`/address/temporary/${id}`, formData);
  return data;
};

export const getAddressById = (id) => {
  if (id) {
    const data = axiosInstance.get(`/address/employee/${id}`);
    console.log(data?.district);
    return data;
  }
};

export const editPermanentAddress = async (formData, addressId) => {
  const {id} = formData
  const data = await axiosInstance.put(`/address/${id}`, formData);
  return data;
};
