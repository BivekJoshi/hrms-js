import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addPermanentAddress,
  addTemporaryAddress,
  editAddress,
  getAddressById,
} from '../../api/address/address-api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const usePermanentAddAddress = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ['addAddress'],
    (formData) => addPermanentAddress(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Permanent address added successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getAddressById');
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

export const useTemporaryAddress = ({ onSuccess }) => {
  const { id } = useParams();

  const addTemporaryAddressMutation = (formData) => {
    if (formData) {
      return addTemporaryAddress(formData, id);
    }
    return Promise.resolve();
  };

  return useMutation(
    ['temporaryAddress'],
    addTemporaryAddressMutation,
    {
      onSuccess: (data, variables, context) => {
        // toast.success('Temporary address added successfully');
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};


export const useGetAddressById = (id) => {
  return useQuery(['getAddressById', id], () => getAddressById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useEditAddress = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation(
    ['editAddress'],
    (formData) => {
      editAddress(formData, id);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success('Address edited successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getAddressById');
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};