import { useParams } from 'react-router';
import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getBankDetailById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/bank-details/employee/${id}`);
    return data;
  }
};

export const getBankDetailsBankId = async (bankId) => {
  if (bankId) {
    const data = await axiosInstance.get(`/bank-details/${bankId}`);
    return data;
  }
};

export const getBankDetails = async () => {
  const data = await axiosInstance.get(`/bank-details`);
  return data;
};

export const addBankDetail = async (formData, id) => {
  const data = await axiosInstance.post(`/bank-details/create/${id}`, formData);
  return data;
};

export const editBankDetail = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(
    `/bank-details/update/${id}`,
    formData
  );
  return data;
};
