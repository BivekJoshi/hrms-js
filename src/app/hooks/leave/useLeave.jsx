import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { addleave, getleave } from '../../api/leave/leave-api';

export const useGetLeave = () => {
    return useQuery(['getLeave'], () => getleave(), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
};

export const useAddLeave = ({ onSuccess }) => {
    return useMutation(['addLeave'], (formData) => addleave(formData), {
        onSuccess: (data, variables, context) => {
            toast.success('Succesfully added Leave');
            onSuccess && onSuccess(data, variables, context);
        },
        onError: (err, _variables, _context) => {
            toast.error(`error: ${err.message}`);
        },
    });
};