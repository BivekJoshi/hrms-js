import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  terminateEmployee,
  addActiveEmployee,
  getDeactivatedEmployee,
  removeActiveEmployee,
  activeEmployee,
  getDeactivatedUser,
  activateUser,
} from '../../../api/employee/employee-api';
import { useParams } from 'react-router-dom';

/*________________________GET-DEACTIVATE-EMPLOYEE_____________________________________*/
export const useGetDeactivatedEmployee = () => {
  return useQuery(['getDeactivateEmployee'], () => getDeactivatedEmployee(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET-DEACTIVATE-EMPLOYEE_____________________________________*/
export const useGetDeactivatedUser = () => {
  return useQuery(['getDeactivateUser'], () => getDeactivatedUser(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________DE-ACTIVATE-EMPLOYEE_____________________________________*/
export const useDeleteEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['removeEmployee'],
    (formData) => removeActiveEmployee(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully removed Employee');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getEmployee');
      },
    }
  );
};

/*________________________ACTIVATE-EMPLOYEE_____________________________________*/
export const useActiveEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['activeEmployee'],
    (formData) => addActiveEmployee(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully activated Employee');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getDeactivateEmployee');
      },
    }
  );
};

/*________________________DE-ACTIVATE-EMPLOYEE_____________________________________*/
export const useTerminateEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['terminateEmployee'],
    (formData) => terminateEmployee(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Employee terminated successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getEmployeeData');
      },
    }
  );
};

/*________________________ACTIVATE-EMPLOYEE_____________________________________*/
export const useActiveTerminateEmployee = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['activeEmployee'],
    (formData) => activeEmployee(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully activated Employee');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getDeactivateEmployee');
      },
    }
  );
};

export const useActivateUser = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['activateUser'], (formData) => activateUser(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Successfully activated user.');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getDeactivateUser');
    },
  });
};
