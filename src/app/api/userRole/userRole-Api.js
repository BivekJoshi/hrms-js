import { axiosInstance } from "../../../auth/axiosInterceptor";

export const getUserRole = async () =>{
    const data = await axiosInstance.get(`/role`);
    return data;
}