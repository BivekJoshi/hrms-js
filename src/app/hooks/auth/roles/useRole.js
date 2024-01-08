import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  addRole,
  deleteRole,
  editPermissionRole,
  editRole,
  getRole,
  getRoleById,
} from '../../../api/auth/roles/role-api';

/*________________________GET_____________________________________*/
export const useGetRole = () => {
  return useQuery(['getRole'], () => getRole(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GETBYID_____________________________________*/
export const useGetRoleByID = (id) => {
  return useQuery(['getRoleById', id], () => getRoleById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddRole = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['addUserControl'], (formData) => addRole(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Role Added Sucessfully');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getRole');
    },
  });
};

/*________________________EDIT NAME_____________________________________*/
export const useEditRole = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['editUserControl'], (formData) => editRole(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Role Edied Sucessfully');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getRole');
    },
  });
};

/*________________________EDIT NAME_____________________________________*/
export const useEditPermissionRole = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editPermissionRole'],
    (formData) => editPermissionRole(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Role Edied Sucessfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getRole');
      },
    }
  );
};
/*________________________DELETE_____________________________________*/
export const useDeleteRole = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['deleteUserControl'], (id) => deleteRole(id), {
    onSuccess: (data, variables, context) => {
      toast.success('Successfully deleted user');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getRole');
    },
  });
};
