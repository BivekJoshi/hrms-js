import { useMutation } from 'react-query';
import { addDocument } from '../../api/document/document-api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useAddDocument = ({ onSuccess }) => {
  const { id } = useParams();
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
