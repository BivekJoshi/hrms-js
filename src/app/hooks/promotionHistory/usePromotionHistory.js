import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addPromotionHistory,
  getPromotionHistory,
} from '../../api/promotionHistory/promotionHistory-api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

{
  /*________________________GET_____________________________________*/
}
export const useGetPromotionHistory = (id) => {
  return useQuery(['getPromotionHistory', id], () => getPromotionHistory(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useAddPromotionHistory = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ['addPromotionHistory'],
    (formData) => addPromotionHistory(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Position changed successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getPromotionHistory');
      },
    }
  );
};
