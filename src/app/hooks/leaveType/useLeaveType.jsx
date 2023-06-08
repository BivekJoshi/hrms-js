import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { addLeaveType, getLeaveType } from '../../api/leaveType/leaveType-api';

export const useGetLeaveType = () => {
    return useQuery(['getLeaveType'], () => getLeaveType(), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
};

export const useAddLeaveType = ({ onSuccess }) => {
    return useMutation(['addLeaveType'], (formData) => addLeaveType(formData), {
        onSuccess: (data, variables, context) => {
            toast.success('Succesfully added Leave Type');
            onSuccess && onSuccess(data, variables, context);
        },
        onError: (err, _variables, _context) => {
            toast.error(`error: ${err.message}`);
        },
    });
};