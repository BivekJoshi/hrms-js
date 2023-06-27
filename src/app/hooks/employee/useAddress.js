import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addPermanentAddress,
  addTemporaryAddress,
  editPermanentAddress,
  getAddressById,
} from '../../api/address/address-api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const usePermanentAddAddress = ({ onSuccess }) => {
  const queryClient = useQueryClient()
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
  return useMutation(
    ['temporaryAddress'],
    (formData) => addTemporaryAddress(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Temporary address added successfully');
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

export const useEditAddress = (addressId) => {
  const queryClient = useQueryClient()
  return useMutation(
    ['editAddress'],
    (formData) => {
      editPermanentAddress(formData, id);
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
