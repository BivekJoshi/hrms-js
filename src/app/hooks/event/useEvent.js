import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addEvent, deleteEvent, editEvent, getEvent, getEventById } from '../../api/event/event-api';

{/*________________________GET_____________________________________*/ }
export const useGetEvent = () => {
    return useQuery(['getEvent'], () => getEvent(), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
};

{/*________________________GETBYID_____________________________________*/ }
export const useGetEventById = (id) => {
    return useQuery(['getEventById', id], () => getEventById(id), {
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

{/*________________________DELETE_____________________________________*/ }
export const useDeleteEvent = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
        ['deleteEvent'],
        (eventId) => deleteEvent(eventId),
        {
            onSuccess: (data, variables, context) => {
                toast.success('Successfully deleted an Event');
                onSuccess && onSuccess(data, variables, context);
                queryClient.invalidateQueries('getEvent');
            },
            onError: (err, _variables, _context) => {
                toast.error(`Error: ${err.message}`);
            },
        }
    );
};

{/*________________________EDIT_____________________________________*/ }
export const useEditEvent = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(['editEvent'], (formData) => editEvent(formData), {
        onSuccess: (data, variables, context) => {
            toast.success('Succesfully edited an Event');
            onSuccess && onSuccess(data, variables, context);
            queryClient.invalidateQueries('getEvent');
        },
        onError: (err, _variables, _context) => {
            toast.error(`error: ${err.message}`);
        },
    });
};
