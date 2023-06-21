import { axiosInstance } from "../../../auth/axiosInterceptor";

{/*________________________GET_____________________________________*/ }
export const getTodoList = async () => {
    const data = await axiosInstance.get(`/to-do-list/get-all`);
    return data;
};

{/*________________________GET-BY-ID_____________________________________*/ }
export const getTodoListById = async (id) => {
    if(id){
        const data = await axiosInstance.get(`/to-do-list/get-by-id/${id}`);
        return data;
    }
};


{/*________________________GET-BY-USER-ID_____________________________________*/ }
export const getTodoListByUserId = async (userId) => {
    const data = await axiosInstance.get(`/to-do-list/get-by-user-id/${userId}`);
    return data;
};


{/*________________________POST_____________________________________*/ }
export const addTodoList = async (formData) => {
    const data = await axiosInstance.post("/to-do-list", formData);
    return data;
}

{/*________________________EDIT_____________________________________*/ }
export const editTodoList = async (formData) => {
    const { id } = formData;
    const data = await axiosInstance.put(`/to-do-list/edit/${id}`, formData);
    return data;
}

{/*________________________DELETE_____________________________________*/ }
export const deleteTodoList = async (id) => {
    const res = await axiosInstance.delete(`/to-do-list/delete/${id}`);
    return res.data;
}