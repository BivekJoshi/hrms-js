import { axiosInstance } from "../../../auth/axiosInterceptor";

/*________________________GETEmployeeDeviceMappingBYBanchId_____________________________________*/
export const getEmployeeDeviceMappingById = async () => {
  const data = await axiosInstance.get(`/employee-device-map/`);
  return data;
};

/*________________________AddEmployeeDeviceMappingBYBanchId_____________________________________*/
export const addEmployeeDeviceMappingById = async (formData) => {
  const data = await axiosInstance.post(`/employee-device-map/`, formData);
  return data;
};
