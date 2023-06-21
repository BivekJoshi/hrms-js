import { axiosInstance } from "../../../auth/axiosInterceptor";
// ________________________GET_____________________________________;
export const getDesignation = async () => {
  const data = await axiosInstance.get(`/position`);
  return data;
};
{
  /*________________________POST_____________________________________*/
}
export const addDesignation = async (formData) => {
  const data = await axiosInstance.post("/position", formData);
  return data;
};
// ________________________GETBYID_____________________________________;
export const getDesignationById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/position/${id}`);
    return data;
  }
};

{
  /*________________________EDIT_____________________________________*/
}

export const editDesignation = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/position/${id}`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteDesignation = async (Id) => {
  const response = await axiosInstance.delete(`/position/${Id}`);
  return response.data;
};
