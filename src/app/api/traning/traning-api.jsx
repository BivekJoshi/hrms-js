import { axiosInstance } from '../../../auth/axiosInterceptor';

{/*___________________________________POST_________________________________________*/}
export const addTraningDetail = async (formData) => {
    const data = await axiosInstance.post(`/training`, formData);
    return data;
};

// export const getBankDetailById = async (id) => {
//     if (id) {
//         const data = await axiosInstance.get(`/bank-details/employee/${id}`);
//         return data;
//     }
// };

// export const getBankDetailsBankId = async (bankId) => {
//     if (bankId) {
//         const data = await axiosInstance.get(`/bank-details/${bankId}`);
//         return data;
//     }
// };

// export const getBankDetails = async () => {
//     const data = await axiosInstance.get(`/bank-details`);
//     return data;
// };

// export const editBankDetail = async (formData) => {
//     const { id } = formData;
//     const data = await axiosInstance.put(
//         `/bank-details/update/${id}`,
//         formData
//     );
//     return data;
// };
