import { axiosInstance } from '../../../auth/axiosInterceptor';

{
  /*________________________GETALL_____________________________________*/
}
export const getOfficeEmployee = async () => {
  const data = await axiosInstance.get(`/office/employee/get-all`);
  return data;
};

{
    /*________________________GETBYID_____________________________________*/
  }
  export const getOfficeEmployeeById = (id) => {
    if (id) {
      const data = axiosInstance.get(`office/employee/employee-id/${id}`);
      return data;
    }
  };

{
  /*________________________POST_____________________________________*/
}
export const addOfficeEmployee = async (formData, getId) => {
  const data = await axiosInstance.post(`/office/employee/create`, formData);
  return data;
};



{
  /*________________________EDIT_____________________________________*/
}
export const editOfficeEmployee = async (formData, id) => {
  if (id) {
    const data = await axiosInstance.put(`/office/employee/${id}`, formData);
    return data;
  }
};