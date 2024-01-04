import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addEmployeeDeviceMappingById,
  getEmployeeDeviceMappingById,
} from '../../api/employeeMapping/employeeMappingApi';
import { toast } from 'react-toastify';

{
  /*________________________GET_____________________________________*/
}
export const useGetEmployeeDeviceMappingById = () => {
  return useQuery(
    ['getEmployeeDeviceMappingById'],
    () => getEmployeeDeviceMappingById(),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*___________________post employee data______________________________________*/
export const useAddEmployeeDeviceMappingById = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['addEmployeeDeviceMappingById'],
    (formData) => addEmployeeDeviceMappingById(formData),

    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully Send Mail');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getEmployeeDeviceMappingById');
      },
    }
  );
};
