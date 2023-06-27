import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addList, deleteList, editList, getList, getListById, getListByUserId } from '../../api/Todo/todo-api';

{/*________________________GET_____________________________________*/ }
export const useGetList = () => {
  return useQuery(['getList'], () => getList(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________GETBYUSERID_____________________________________*/ }
export const useGetUserListById = (id) => {
  return useQuery(['getListByUserId', id], () => getListByUserId(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________GETBYID_____________________________________*/ }
export const useGetListById = (id) => {
  return useQuery(['getListById', id], () => getListById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________POST_____________________________________*/ }
export const useAddList = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['addList'], (formData) => addList(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully added To List');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getListByUserId');
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{/*________________________DELETE_____________________________________*/ }
export const useDeleteList = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['deleteList'], (listId) => deleteList(listId), {
    onSuccess: (data, variables, context) => {
      toast.success('Successfully deleted List');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getListByUserId');
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};

{/*________________________EDIT_____________________________________*/ }
export const useEditList = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['editList'],
    (formData) => editList(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully edited List');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getListByUserId');
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    });
};
