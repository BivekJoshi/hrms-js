import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addDocument, getDocument, getDocumentByDocumentType, getDocumentById } from '../../api/document/document-api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../auth/axiosInterceptor';

export const useAddDocument = ({ onSuccess }) => {
  const { id } = useParams();

  const addDocument = async (image, id) => {
    const { documentType, document } = image;
    const imgData = new FormData();
    imgData.append('file', document);
    imgData.append('documentType', documentType);
    const { data } = await axiosInstance.post(
      `/employee/document/uploadFile/${id}?documentType=${documentType}`,
      imgData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  };

  const queryClient = useQueryClient();
  return useMutation(
    ['addDocument'],
    (formData) => {
      addDocument(formData, id);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success('Document added successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDocumentType");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

{/*________________________GET_____________________________________*/}
export const useGetDocument = () => {
  return useQuery(["getDocument"], () => getDocument(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________GETBYID_____________________________________*/}
export const useGetDocumentById = (id) => {
  return useQuery(["getDocumentById", id], () => getDocumentById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________GET-DOCUMENT BY DOUCUMENT-TYPE_____________________________________*/}
export const useGetDocumentByDocumentType = (id, documentType) => {
  return useQuery(["getDocumentType", id, documentType], () => getDocumentByDocumentType(id, documentType), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};