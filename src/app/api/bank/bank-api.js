import { useParams } from 'react-router';
import { axiosInstance } from '../../../auth/axiosInterceptor';

{/*____________________________GETBANKDETAILSBYEMPLOYEEID____________________________________________*/}
export const getBankDetailById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/bank-details/employee-id/${id}`);
    return data;
  }
};

{/*____________________________GETBANKDETAILSBYID____________________________________________*/}
export const getBankDetailsBankId = async (bankId) => {
  if (bankId) {
    const data = await axiosInstance.get(`/bank-details/${bankId}`);
    return data;
  }
};

{/*____________________________GETALL____________________________________________*/}
export const getBankDetails = async () => {
  const data = await axiosInstance.get(`/bank-details/get-all`);
  return data;
};

{/*____________________________POST____________________________________________*/}
export const addBankDetail = async (formData, id) => {
  const data = await axiosInstance.post(`/bank-details/create/${id}`, formData);
  return data;
};

{/*____________________________EDIT____________________________________________*/}
export const editBankDetail = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(
    `/bank-details/update/${id}`,
    formData
  );
  return data;
};
