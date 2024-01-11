import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  addBranchHistory,
  getBranchHistory,
} from '../../api/company/company-api';

{
  /*________________________GET_____________________________________*/
}
export const useGetBranchHistory = (id) => {
  return useQuery(['getBranchHistory', id], () => getBranchHistory(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useAddBranchHistory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['addBranchHistory'],
    (formData) => addBranchHistory(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully added branch history of employee');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getBranchHistory');
      },
    }
  );
};
