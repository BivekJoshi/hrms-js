import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*____________________________POST____________________________________________*/}
export const addforgotPassword = async (formData) => {
    const emailData = formData.email;
    const data = await axiosInstance.post(`/user/forgot-password-email/random-password?email=${emailData}`,);
    return data;
};