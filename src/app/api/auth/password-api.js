import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*____________________________GET____________________________________________*/}
export const getUserById = async (id) => {
    const data = await axiosInstance.get(`/user/${id}`);
    return data;
};
{/*____________________________POST____________________________________________*/}
export const addforgotPassword = async (formData) => {
    const emailData = formData.email;
    const data = await axiosInstance.post(`/user/forgot-password-email/random-password?email=${emailData}`,);
    return data;
};

{/*____________________________PUT____________________________________________*/}
export const addResetPassword = async (formData) => {
    const {id} = formData;
    const data = await axiosInstance.put(`/user/reset-password/${id}`, formData);
    return data;
};