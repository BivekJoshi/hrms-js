import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addDocument, getDocument, getDocumentById } from '../../api/document/document-api';
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

  return useMutation(
    ['addDocument'],
    (formData) => {
      addDocument(formData, id);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success('Document added successfully');
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

// export const useAddDocument = ({ onSuccess }) => {
//   const { id } = useParams();
//   return useMutation(
//     ['addDocument'],
//     (formData) => {
//       addDocument(formData, id);
//     },
//     {
//       onSuccess: (data, variables, context) => {
//         toast.success('Document added successfully');
//         onSuccess && onSuccess(data, variables, context);
//       },
//       onError: (err, _variables, _context) => {
//         toast.error(`error: ${err.message}`);
//       },
//     }
//   );
// };

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
