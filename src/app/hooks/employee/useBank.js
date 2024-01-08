import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addBankDetail,
  editBankDetail,
  getBankDetailById,
  getBankDetails,
  getBankDetailsBankId,
} from '../../api/bank/bank-api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

{
  /*____________________________GETBANKDETAILSBYID____________________________________________*/
}
export const useGetBankByEmployeeId = () => {
  const { id } = useParams();
  return useQuery(['getBankDetailById'], () => getBankDetailById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*____________________________GETBANKDETAILSBYID____________________________________________*/
}
export const useGetBankById = (id) => {
  return useQuery(['getBankDetailsBankId'], () => getBankDetailsBankId(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*____________________________GETALL____________________________________________*/
}
export const useGetBank = () => {
  return useQuery(['getBank'], () => getBankDetails(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*____________________________POST____________________________________________*/
}
export const useAddBank = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(['addBank'], (formData) => addBankDetail(formData, id), {
    onSuccess: (data, variables, context) => {
      toast.success('Bank details added successfully');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getBankDetailById');
    },
  });
};

{
  /*____________________________EDIT____________________________________________*/
}
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
        queryClient.invalidateQueries('getBankDetailById');
      },
    }
  );
};
