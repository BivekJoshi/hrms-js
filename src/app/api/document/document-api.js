import { axiosInstance } from '../../../auth/axiosInterceptor';

export const addDocument = async (image, id) => {
  const { documentType, document } = image;
  const imgData = new FormData();
  imgData.append('file', document);
  imgData.append('documentType', documentType);
  const { data } = await axiosInstance.post(`/employee/document/uploadFile/${id}?documentType=${imgData}`,
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
  const data = await axiosInstance.get(`/employee/document/file-details-by-employee/${id}`);
  return data;
};

export const getDocumentByDocumentType = async (id, documentType) => {
  const data = await axiosInstance.get(`/employee/document/file-details-employee-and-document-type/${id}?documentType=${documentType}`);
  return data;
};