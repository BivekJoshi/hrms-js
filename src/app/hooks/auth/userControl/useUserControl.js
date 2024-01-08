import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  getUserControl,
  getUserControlById,
  addUserControl,
  getUserRole,
  editUserControlRoleSetting,
  deleteUser,
} from '../../../api/auth/userControl/userControl-api';
import { toast } from 'react-toastify';

{
  /*________________________GET_____________________________________*/
}
export const useGetUserControl = () => {
  return useQuery(['getUserControl'], () => getUserControl(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET-USER-BY-ID_____________________________________*/
export const useGetUserControlById = (id) => {
  return useQuery(['getUserControl', id], () => getUserControlById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddUserControl = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['addUserControl'],
    (formData) => addUserControl(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('User added Successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getUserControl');
      },
      onError: (err, _variables, _context) => {
        // toast.error(`error: ${err.message}`);
      },
    }
  );
};

/*________________________EDIT_____________________________________*/
export const useEditUserControl = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editUserControlRoleSetting'],
    (formData) => editUserControlRoleSetting(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully edited user');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getUserControl');
      },
    }
  );
};

/*________________________DELETE_____________________________________*/
export const useDeleteUserControl = ({ onSuccess, rowData }) => {
  const queryClient = useQueryClient();
  return useMutation(['deleteUserControl'], (id) => deleteUser(rowData?.id), {
    onSuccess: (data, variables, context) => {
      toast.success('Successfully deleted user');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getUserControl');
    },
  });
};

{
  /*____________________________ROLE-API____________________________________________*/
}

{
  /*____________________________GET-USER____________________________________________*/
}
export const useGetUserRole = () => {
  return useQuery(['getUserRole'], () => getUserRole(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
