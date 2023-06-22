import { axiosInstance } from '../../../auth/axiosInterceptor';

export const addPermanentAddress = async (formData, id) => {
  const submittedData = formData.addresses?.map((d, index) => {
    return {
      ...d,
      addressType: index === 0 ? 'PERMANENT' : 'TEMPORARY',
    };
  });
  console.log(submittedData);
  const data = await axiosInstance.post(`/address/${id}`, submittedData);
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

export const editPermanentAddress = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/address/${id}`, formData);
  return data;
};
