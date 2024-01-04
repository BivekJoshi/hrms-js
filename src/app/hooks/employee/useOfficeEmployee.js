import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  addOfficeEmployee,
  editOfficeEmployee,
  getOfficeEmployee,
  getOfficeEmployeeById,
} from '../../api/officeEmployee/office-employee-api';

export const useGetOfficeEmployee = () => {
  return useQuery(['getOfficeEmployee'], () => getOfficeEmployee(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetOfficeEmployeeById = (id) => {
  return useQuery(['getEmployeeById', id], () => getOfficeEmployeeById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useEditOfficeEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  return useMutation(
    ['editOfficeEmployee '],
    (formData) => {
      editOfficeEmployee(formData, id);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success('Office Employee edited successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getOfficeEmployeeById');
      },
    }
  );
};

export const useAddOfficeEmployee = (onSuccess) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['addEmployees'],
    (formData) => addOfficeEmployee(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Office employee added successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getOfficeEmployee');
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};
