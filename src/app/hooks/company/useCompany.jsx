import { useMutation, useQuery } from 'react-query';
import { addCompany, getCompany } from '../../api/company/company-api';
import { toast } from 'react-toastify';

export const useGetCompany = () => {
  return useQuery(['getCompany'], () => getCompany(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useAddCompany = ({ onSuccess }) => {
  return useMutation(['addCompany'], (formData) => addCompany(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully added Company');
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};