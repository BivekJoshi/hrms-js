import { axiosInstance } from "../../../../auth/axiosInterceptor";

{
  /*________________________GET ALL EMPLOYEE RESOURCE_____________________________________*/
}
export const getemployeeResource = async () => {
  const data = await axiosInstance.get(`/employee-resource/get-all`);
  return data;
};

{
  /*________________________GET OFFICE RESOURCE BY EMPLOYEE RESOURCE ID_____________________________________*/
}
export const getemployeeResourceById = async (id) => {
  const data = await axiosInstance.get(`/employee-resource/emp-res-id/${id}`);
  // console.log(data);
  return data;
};
{
  /*________________________log in user EMPLOYEE RESOURCE_____________________________________*/
}
export const logInRemployeeResource = async (id) => {
  const data = await axiosInstance.get(
    `/employee-resource/emp-res-emp-id/${id}`
  );
  return data;
};
{
  /*________________________POST EMPLOYEE RESOURCE_____________________________________*/
}
export const addemployeeResource = async (formData) => {
  const data = await axiosInstance.post(`/employee-resource/create`, formData);
  return data;
};

{
  /*________________________EDIT EMPLOYEE RESOURCE_____________________________________*/
}
export const editemployeeResource = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(
    `/employee-resource/update/${id}`,
    formData
  );
  return data;
};

{
  /*________________________DELETE EMPLOYEE RESOURCE_____________________________________*/
}
export const deleteemployeeResource = async (empResId) => {
  const response = await axiosInstance.delete(
    `/employee-resource/delete/${empResId}`
  );
  return response.data;
};
