import { useMutation, useQuery } from 'react-query';
import { addEmployee, getEmployee, getEmployeeById } from '../../api/employee/employee-api';
import { toast } from 'react-toastify';

export const useGetEmployee = () => {
  return useQuery(['getEmployee'], () => getEmployee(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetEmployeeById = (id) => {
  return useQuery(['getEmployeeById'], () => getEmployeeById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useAddEmployee = ({ onSuccess }) => {
  return useMutation(['addEmployee'], (formData) => addEmployee(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully added Employee');
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};
