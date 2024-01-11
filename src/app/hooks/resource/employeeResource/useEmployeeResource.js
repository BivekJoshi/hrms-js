import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  addemployeeResource,
  deleteemployeeResource,
  editemployeeResource,
  getemployeeResource,
  getemployeeResourceById,
  logInRemployeeResource,
} from '../../../api/resource/employeeResouce/employeeResource';

{
  /*________________________GET ALL EMPLOYEE RESOURCE_____________________________________*/
}
export const useGetEmployeeResource = () => {
  return useQuery(['getemployeeResource'], () => getemployeeResource(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET OFFICE RESOURCE BY EMPLOYEE RESOURCE ID_____________________________________*/
}
export const useGetEmployeeResourceById = (id) => {
  return useQuery(
    ['getemployeeResourceById', id],
    () => getemployeeResourceById(id),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

{
  /*_________________________get uselogIn EMPLOYEE RESOURCE_____________________________________*/
}
export const uselogInEemployeeResource = (id) => {
  return useQuery(
    ['logInRemployeeResource', id],
    () => logInRemployeeResource(id),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
};

/*________________________POST_____________________________________*/
export const useAddEmployeeResource = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['addemployeeResource'],
    (formData) => addemployeeResource(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully provide employee with office logistic');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getemployeeResource');
      },
    }
  );
};

{
  /*_________________________DELETE EMPLOYEE RESOURCE_____________________________________*/
}
export const useDeleteEmployeeResource = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  getemployeeResource;
  return useMutation(
    ['deleteemployeeResource'],
    (leaveId) => deleteemployeeResource(leaveId),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully deleted Employee with office Logistics');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getemployeeResource');
      },
    }
  );
};

{
  /*________________________EDIT EMPLOYEE RESOURCE____________________________________*/
}
export const useEditEmployeeResource = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editemployeeResource'],
    (formData) => editemployeeResource(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully edited Employee with office Logistics');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getemployeeResource');
      },
    }
  );
};
