import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getDesignation = async () => {
  const data = await axiosInstance.get(`/position`);
  return data;
};

export const addDesignation = async (formData) => {
  const data = await axiosInstance.post('/position', formData);
  return data;
};

export const deleteDesignation = async (designationId) => {
  const response = await axiosInstance.delete(`/position/${designationId}`);
  return response.data;
};

export const editDesignation = async (formData) => {
  const { id } = formData;
  const data = await axiosInstance.put(`/position/${id}`, formData);
  return data;
};
