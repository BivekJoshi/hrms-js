import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*____________________________GET-LOGGED-IN-USER____________________________________________*/}
export const getLoggedInUser = async () => {
    const data = await axiosInstance.get(`/login/logged-in/user-details`);
    return data;
};

{/*____________________________GET____________________________________________*/}
export const getUserById = async (id) => {
    const data = await axiosInstance.get(`/user/${id}`);
    return data;
};
{/*____________________________POST____________________________________________*/}
export const addforgotPassword = async (formData) => {
    const emailData = formData.email;
    const data = await axiosInstance.put(`/user/activate/forgot-password/activation-url?email=${emailData}`,);
    return data;
};

{/*____________________________PUT____________________________________________*/}
export const addResetPassword = async (id, formData) => {
    const data = await axiosInstance.put(`/user/reset-password/${id}`, formData);
    return data;
};

{/*____________________________PUT____________________________________________*/}
export const addRenamePassword = async (formData) => {
    const { id, password } = formData;
    const data = await axiosInstance.put(`/user/activate/set-password/${id}`, { password });
    return data;
};