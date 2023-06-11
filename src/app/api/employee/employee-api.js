import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getEmployee = async () => {
	const data = await axiosInstance.get(`/employee`);
	return data;
};

export const addEmployee = async (formData) => {
	const data = await axiosInstance.post(`/employee`, formData);
	return data;
};
export const getEmployeeById = (id) => {
	const data = axiosInstance.get(`employee/${id}`);

	return data;
};
