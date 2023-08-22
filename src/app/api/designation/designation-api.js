import { axiosInstance } from "../../../auth/axiosInterceptor";

{
  /*________________________GET_____________________________________*/
}
export const getDesignation = async () => {
  const data = await axiosInstance.get(`/position/get-all`);
  return data;
};

{
  /*________________________GETBYID_____________________________________*/
}
export const getDesignationById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/position/${id}`);
    return data;
  }
};

{
  /*________________________POST_____________________________________*/
}
export const addDesignation = async (formData) => {
  const data = await axiosInstance.post("/position/create", formData);
  return data;
};

{
  /*________________________EDIT_____________________________________*/
}
export const editDesignation = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/position/update/${id}`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteDesignation = async (designationId) => {
  const response = await axiosInstance.delete(`/position/${designationId}`);
  return response.data;
};
