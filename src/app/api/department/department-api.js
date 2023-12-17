import { axiosInstance } from '../../../auth/axiosInterceptor';

{
  /*________________________GET_____________________________________*/
}
export const getDepartment = async () => {
  const data = await axiosInstance.get(`/department/get-all`);
  return data;
  s;
};

{
  /*________________________GETBYID_____________________________________*/
}
export const getDepartmentById = async (id) => {
  if (id) {
    const data = await axiosInstance.get(`/department/department-id/${id}`);
    return data;
  }
};

{
  /*________________________POST_____________________________________*/
}
export const addDepartment = async (formData) => {
  const data = await axiosInstance.post('/department/create', formData);
  return data;
};

{
  /*________________________EDIT_____________________________________*/
}
export const editDepartment = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/department/update/${id}`, formData);
  return data;
};

{
  /*________________________DELETE_____________________________________*/
}
export const deleteDepartment = async (departmentId) => {
  if (departmentId) {
    const response = await axiosInstance.delete(
      `/department/delete/${departmentId}`
    );
    return response.data;
  }
};
