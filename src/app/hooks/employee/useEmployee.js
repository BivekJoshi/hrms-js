import { useMutation, useQuery } from 'react-query';
import {
  addEmployee,
  editEmployee,
  getEmployee,
  getEmployeeById,
} from '../../api/employee/employee-api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export const useGetEmployee = () => {
  return useQuery(['getEmployee'], () => getEmployee(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetEmployeeById = (id) => {
  return useQuery(['getEmployeeById', id], () => getEmployeeById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useEditEmployee = ({ onSuccess }) => {
  const { id } = useParams();

  return useMutation(
    ['editEmployee'],
    (formData) => {
      editEmployee(formData, id);
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success('Employee added successfully');
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    }
  );
};

export const useAddEmployee = ({ onSuccess }) => {
  return useMutation(['addEmployees'], (formData) => addEmployee(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Employee added successfully');
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};
