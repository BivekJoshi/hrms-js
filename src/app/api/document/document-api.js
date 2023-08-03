import { axiosInstance } from '../../../auth/axiosInterceptor';

export const getDocument = async () => {
  const data = await axiosInstance.get(`/employee/document/`);
  return data;
};

export const getDocumentById = async (id) => {
  const data = await axiosInstance.get(`/employee/document/file-details-by-employee/${id}`);
  return data;
};

  /*________________________GET-BY-FILE-ID_____________________________________*/
  export const getDocumentByFileId = async (id) => {
    const data = await axiosInstance.get(`/employee/document/file-details-by-file-id/${id}`);
    return data;
  };

  /*________________________GET-BY-FILE-ID-AND-DOCUMENT_____________________________________*/
export const getDocumentByDocumentType = async (id, documentType) => {
  if(id && documentType){
    const data = await axiosInstance.get(`/employee/document/file-details-employee-and-document-type/${id}?documentType=${documentType}`);
    return data;
  }

};

  /*________________________DELETE_____________________________________*/
export const deleteDocumentByFileId = async (id) => {
  const response = await axiosInstance.delete(`/employee/document/${id}`);
  return response.data;
};
