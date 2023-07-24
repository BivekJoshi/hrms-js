import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*____________________________POST____________________________________________*/}
export const addforgotPassword = async (formData) => {
    const data = await axiosInstance.post(`/user/forgot-password`, formData);
    return data;
};