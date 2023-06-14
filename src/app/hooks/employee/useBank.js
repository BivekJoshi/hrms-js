import { useMutation, useQuery } from 'react-query';
import {
  addBankDetail,
  getBankDetailById,
  getBankDetails,
} from '../../api/bank/bank-api';
import { toast } from 'react-toastify';

export const useGetBankById = (id) => {
  return useQuery(['getBankById'], () => getBankDetailById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetBank = () => {
  return useQuery(['getBank'], () => getBankDetails(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useAddBank = ({ onSuccess }) => {
  return useMutation(['addBank'], (formData) => addBankDetail(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Bank details added successfully');
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};
