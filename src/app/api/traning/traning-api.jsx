import { axiosInstance } from '../../../auth/axiosInterceptor';

{/*___________________________________POST_________________________________________*/}
export const addTraningDetail = async (formData) => {
    const data = await axiosInstance.post(`/training`, formData);
    return data;
};