import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addHoliday, getHoliday, getHolidayCurrent } from '../../api/holiday/holiday-api';

{/*________________________GET_____________________________________*/ }
export const useGetHoliday = () => {
    return useQuery(['getHoliday'], () => getHoliday(), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
};

{/*________________________GETCURRENTMONTH_____________________________________*/ }
export const useGetHolidayCurrent = () => {
    return useQuery(['getHolidayCurrent'], () => getHolidayCurrent(), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
};

{/*________________________POST_____________________________________*/ }
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