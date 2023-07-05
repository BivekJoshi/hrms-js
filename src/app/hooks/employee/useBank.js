import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addBankDetail,
  editBankDetail,
  getBankDetailById,
  getBankDetails,
} from '../../api/bank/bank-api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

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
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(['addBank'], (formData) => addBankDetail(formData, id), {
    onSuccess: (data, variables, context) => {
      toast.success('Bank details added successfully');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getBankById');
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

export const useEditBank = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editBank'],
    (formData) => {
      editBankDetail(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success('Bank edited successfully');
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries('getBankById');
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};
