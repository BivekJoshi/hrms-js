import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  addHoliday,
  deleteHoliday,
  editHoliday,
  getHoliday,
  getHolidayById,
  getHolidayByMonth,
} from '../../api/holiday/holiday-api';

{
  /*________________________GET_____________________________________*/
}
export const useGetHoliday = () => {
  return useQuery(['getHoliday'], () => getHoliday(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GETBYID_____________________________________*/
}
export const useGetHolidayById = (id) => {
  return useQuery(['getHolidayById', id], () => getHolidayById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GETCURRENTMONTH_____________________________________*/
}
export const useGetHolidaybyMonth = (monthAd) => {
  return useQuery(
    ['getHolidayByMonth', monthAd],
    () => getHolidayByMonth(monthAd),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

{
  /*________________________POST_____________________________________*/
}
export const useAddHoliday = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['addHoliday'], (formData) => addHoliday(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully added Holiday');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getHoliday');
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{
  /*________________________DELETE_____________________________________*/
}
export const useDeleteHoliday = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['deleteHoliday'],
    (holidayId) => deleteHoliday(holidayId),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully deleted Holiday');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getHoliday');
      },
    }
  );
};

{
  /*________________________EDIT_____________________________________*/
}
export const useEditHoliday = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['editHoliday'], (formData) => editHoliday(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully updated holiday');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getHoliday');
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};
