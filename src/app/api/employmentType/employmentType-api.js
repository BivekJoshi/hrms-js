import { axiosInstance } from "../../../auth/axiosInterceptor";

/*________________________GET_____________________________________*/
export const getEmploymentType = async () => {
  const data = await axiosInstance.get(`/employment-type`);
  return data;
};

/*________________________GETBYID_____________________________________*/
export const getEmploymentTypeById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/employment-type/${id}`);
    return data;
  }
};

/*________________________POST_____________________________________*/
export const addEmploymentType = async (formData) => {
  const data = await axiosInstance.post("/employment-type", formData);
  return data;
};

/*________________________EDIT_____________________________________*/
export const editEmploymentType = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/employment-type/update/${id}`, formData);
  return data;
};

/*________________________DELETE_____________________________________*/
export const deleteEmploymentType = async (id) => {
  if (id) {
    const response = await axiosInstance.delete(`/employment-type/delete/${id}`);
    return response.data;
  }
};
