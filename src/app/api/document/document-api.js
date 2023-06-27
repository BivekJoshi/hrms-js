import { axiosInstance } from '../../../auth/axiosInterceptor';

export const addDocument = async ({ image, id }) => {
  const imgData = new FormData();
  imgData.append('image', image);
  const { data } = await axiosInstance.post(
    `/employee/document/uploadFile/${id}`,
    imgData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
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
