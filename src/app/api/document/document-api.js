import { axiosInstance } from '../../../auth/axiosInterceptor';

export const addDocument = async (formData, id) => {
  const data = await axiosInstance.post(
    `/employee/document/uploadFile/${id}`,
    formData
  );
  return data;
};

export const getDocument = async () => {
  const data = await axiosInstance.get(`/employee/document/`);
  return data;
};

export const getDocumentById = async (id) => {
  const data = await axiosInstance.get(`/employee/document/${id}`);
  return data;
};
