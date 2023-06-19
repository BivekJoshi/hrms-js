import { useMutation } from 'react-query';
import { addQualification } from '../../api/qualification/qualification-api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export const useAddQualification = ({ onSuccess }) => {
  const { id } = useParams();
  return useMutation(
    ['addQualification'],
    (formData) => addQualification(formData,id),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Qualification added successfully');
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};
