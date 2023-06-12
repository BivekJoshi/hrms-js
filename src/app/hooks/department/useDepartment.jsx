import { useMutation, useQuery } from 'react-query';
import { addDepartment, getDepartment } from '../../api/department/department-api';
import { toast } from 'react-toastify';

export const useGetDepartment = () => {
  return useQuery(['getDepartment'], () => getDepartment(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useAddDepartment = ({ onSuccess }) => {
  return useMutation(['addDepartment'], (formData) => addDepartment(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully added Department');
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};