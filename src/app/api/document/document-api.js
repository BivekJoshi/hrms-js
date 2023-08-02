import { axiosInstance } from '../../../auth/axiosInterceptor';


//   /*________________________POST_____________________________________*/
// export const addDocument = async (image, id) => {
//   const { documentType, document } = image;
//   const imgData = new FormData();
//   imgData.append('file', document);
//   imgData.append('documentType', documentType);
//   const { data } = await axiosInstance.post(`/employee/document/uploadFile/${id}?documentType=${imgData}`,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     }
//   );
//   return data;
// };

export const addProfile = async (image, id) => {
  const { documentType, document } = image;
  const imgData = new FormData();
  imgData.append('file', document);
  imgData.append('documentType', documentType);
  const { data } = await axiosInstance.post(`/employee/document/uploadFile/${id}`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};


  /*________________________GET-BY-ID_____________________________________*/
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


  // /*________________________EDIT_____________________________________*/
  // export const editDocument = async (formData) => {
  //   const { id, document } = formData;
  //   const imgData = new FormData();
  //   imgData.append('file', document);

  //   const { data } = await axiosInstance.put(`employee/document/change-multipart-file/${id}`, imgData,
  //   {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   }
  //   );
  //   return data;
  // };

  /*________________________DELETE_____________________________________*/
export const deleteDocumentByFileId = async (id) => {
  const response = await axiosInstance.delete(`/employee/document/${id}`);
  return response.data;
};