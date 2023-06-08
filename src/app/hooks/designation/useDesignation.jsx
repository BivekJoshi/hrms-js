import { useMutation, useQuery } from 'react-query';
import { addDesignation, getDesignation } from '../../api/designation/designation-api';
import { toast } from 'react-toastify';

export const useGetDesignation = () => {
  return useQuery(['getDesignation'], () => getDesignation(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useAddDesignation = ({ onSuccess }) => {
  return useMutation(['addDesignation'], (formData) => addDesignation(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully added Designation');
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};