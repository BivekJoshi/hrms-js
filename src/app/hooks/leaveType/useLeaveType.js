import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  activateLeaveType,
  addLeaveType,
  deactivateLeaveType,
  deleteLeaveType,
  editLeaveType,
  getAllLeaveType,
  getLeaveType,
  getLeaveTypeById,
} from '../../api/leaveType/leaveType-api';

{
  /*________________________GET_____________________________________*/
}
export const useGetLeaveType = () => {
  return useQuery(['getLeaveType'], () => getLeaveType(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
{
  /*________________________GET-ALL_____________________________________*/
}
export const useGetAllLeaveType = () => {
  return useQuery(['getAllLeaveType'], () => getAllLeaveType(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GETBYID_____________________________________*/
}
export const useGetLeaveTypeById = (id) => {
  return useQuery(['getLeaveTypeById', id], () => getLeaveTypeById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useAddLeaveType = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['addLeaveType'], (formData) => addLeaveType(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Successfully added Leave Type');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getLeaveType');
    },
  });
};

{
  /*________________________DELETE_____________________________________*/
}
export const useDeleteLeaveType = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['deleteLeaveType'],
    (leavetypeId) => deleteLeaveType(leavetypeId),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully deleted Leave type');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getLeaveType');
      },
    }
  );
};

{
  /*________________________EDIT_____________________________________*/
}
export const useEditLeaveType = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['editLeaveType'], (formData) => editLeaveType(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Successfully edited Leave Type');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getLeaveType');
    },
  });
};


// refactor later below api
{
  /*________________________deactivate_____________________________________*/
}
export const useDeactivateLeaveType = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['deleteLeaveType'],
    (data) => deactivateLeaveType(data),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully activated leave type');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getAllLeaveType');
        queryClient.invalidateQueries('getLeaveType');
      },
    }
  );
};



{
  /*________________________Activate_____________________________________*/
}
export const useActivateLeaveType = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['deleteLeaveType'],
    (data) => activateLeaveType(data),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully deactivated leave type');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getAllLeaveType');
        queryClient.invalidateQueries('getLeaveType');
      },
    }
  );
};