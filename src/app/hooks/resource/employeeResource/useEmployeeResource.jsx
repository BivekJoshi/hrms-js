import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { 
    addemployeeResource,
    deleteemployeeResource,
    editemployeeResource,
    getemployeeResource,
    getemployeeResourceById,
    } from '../../../api/resource/employeeResouce/employeeResource';

{/*________________________GET ALL EMPLOYEE RESOURCE_____________________________________*/ }
export const useGetEmployeeResource = () => {
  return useQuery(['getemployeeResource'], () => getemployeeResource(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________GET OFFICE RESOURCE BY EMPLOYEE RESOURCE ID_____________________________________*/ }
export const useGetEmployeeResourceById = (id) => {
  return useQuery(['getemployeeResourceById', id], () => getemployeeResourceById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddEmployeeResource = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addemployeeResource"], (formData) => addemployeeResource(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Succesfully added Company");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getemployeeResource");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{/*_________________________DELETE EMPLOYEE RESOURCE_____________________________________*/ }
export const useDeleteEmployeeResource = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['deleteemployeeResource'], (leaveId) => deleteemployeeResource(leaveId), {
    onSuccess: (data, variables, context) => {
      toast.success('Successfully deleted Employee with office Resource');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getemployeeResource');
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};

{/*________________________EDIT EMPLOYEE RESOURCE____________________________________*/ }
export const useEditEmployeeResource = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['editemployeeResource'],
    (formData) => editemployeeResource(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully edited Employee with office Resource');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getemployeeResource');
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    });
};