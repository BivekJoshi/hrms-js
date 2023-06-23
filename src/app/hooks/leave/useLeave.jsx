import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addleave, deleteLeave, editLeave, getEmployeeLeaveById, getLeaveById, getleave } from '../../api/leave/leave-api';

{/*________________________GET_____________________________________*/ }
export const useGetLeave = () => {
  return useQuery(['getLeave'], () => getleave(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________GETBYID_____________________________________*/ }
export const useGetLeaveById = (id) => {
  return useQuery(['getCompanyById', id], () => getLeaveById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
{/*________________________GETBYID_____________________________________*/ }
export const useGetEmployeeLeaveById = (id) => {
  return useQuery(['getEmployeeLeaveById', id], () => getEmployeeLeaveById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________POST_____________________________________*/ }
export const useAddLeave = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['addLeave'], (formData) => addleave(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully added Leave');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getLeave');
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{/*________________________DELETE_____________________________________*/ }
export const useDeleteLeave = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['deleteLeave'], (leaveId) => deleteLeave(leaveId), {
    onSuccess: (data, variables, context) => {
      toast.success('Successfully deleted Leave');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getLeave');
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};

{/*________________________EDIT_____________________________________*/ }
export const useEditLeave = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['editLeave'],
    (formData) => editLeave(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully edited Leave');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getLeave');
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    });
};