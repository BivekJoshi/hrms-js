import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addQualification,
  getQualificationById,
} from '../../api/qualification/qualification-api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export const useGetQualificationById = (id) => {
  return useQuery(['getQualification', id], () => getQualificationById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useAddQualification = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ['addQualification'],
    (formData) => addQualification(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Qualification added successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getQualification');
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};
