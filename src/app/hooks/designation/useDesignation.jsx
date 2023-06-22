import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addDesignation,
  deleteDesignation,
  editDesignation,
  getDesignation,
} from '../../api/designation/designation-api';
import { toast } from 'react-toastify';

export const useGetDesignation = () => {
  return useQuery(['getDesignation'], () => getDesignation(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useAddDesignation = ({ onSuccess }) => {
  return useMutation(
    ['addDesignation'],
    (formData) => addDesignation(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Succesfully added Designation');
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

export const useDeleteDesignation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['deleteDesignation'],
    (designationId) => deleteDesignation(designationId),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Designation deleted successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getDesignation');
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};

export const useEditDesignation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editDesignation'],
    (formData) => editDesignation(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Designation edited successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getDesignation');
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};
