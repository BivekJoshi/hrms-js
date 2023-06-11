import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getEmployee = async () => {
  const data = await axiosInstance.get(`/employee`);
  return data;
};

export const getEmployeeById = (id) => {
  const data = axiosInstance.get(`employee/${id}`);
  return data;
};

export const addEmployee = async (formData) => {
  console.log(formData);
  const data = await axiosInstance.post('/employee', formData);
  console.log(data);
  return data;
};
