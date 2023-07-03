import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addEvent, getEvent } from '../../api/event/event-api';

{/*________________________GET_____________________________________*/ }
export const useGetEvent = () => {
    return useQuery(['getEvent'], () => getEvent(), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
};

{/*________________________POST_____________________________________*/ }
export const useAddEvent = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(['addEvent'], (formData) => addEvent(formData), {
        onSuccess: (data, variables, context) => {
            toast.success('Succesfully added an Event');
            onSuccess && onSuccess(data, variables, context);
            queryClient.invalidateQueries('getEvent');
        },
        onError: (err, _variables, _context) => {
            toast.error(`error: ${err.message}`);
        },
    });
};