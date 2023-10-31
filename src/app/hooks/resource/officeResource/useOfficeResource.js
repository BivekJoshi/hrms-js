import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { 
    addofficeResource,
    editofficeResource,
    editofficeResourceActiveInactive,
    editofficeResourceInactive,
    getAvailableOfficeResource,
    getUsedOfficeResource,
    getdeactivaedofficeResource,
    getofficeResource, 
    getofficeResourceById, 
} from '../../../api/resource/officeResource/officeResouce';


{/*________________________GET ALL OFFICE RESOURCE_____________________________________*/ }
export const useGetOfficeResource = () => {
  return useQuery(['getofficeResource'], () => getofficeResource(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
{/*________________________GET used OFFICE RESOURCE_____________________________________*/ }
export const useGetUsedOfficeResource = () => {
  return useQuery(['getUsedOfficeResource'], () => getUsedOfficeResource(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
{/*________________________GET not used OFFICE RESOURCE_____________________________________*/ }
export const useGetAvailableOfficeResource = () => {
  return useQuery(['getAvailableOfficeResource'], () => getAvailableOfficeResource(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________GET OFFICE RESOURCE BY OFFICE RESOURCE ID_____________________________________*/ }
export const useGetOfficeResourceById = (id) => {
  return useQuery(['getofficeResourceById', id], () => getofficeResourceById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________GET ALL DEACTIVATED OFFICE RESOURCE_____________________________________*/ }
export const useGetDeactivatedOfficeResource = () => {
  return useQuery(['getdeactivaedofficeResource'], () => getdeactivaedofficeResource(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________POST OFFICE RESOURCE_____________________________________*/ }
export const useAddOfficeResource = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['addofficeResource'], (formData) => addofficeResource(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully added Office Logistics');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('getofficeResource');
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{/*________________________EDIT OFFICE RESOURCE____________________________________*/ }
export const useEditOfficeResource = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['editofficeResource'],
    (formData) => editofficeResource(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully edited office Logistics');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getofficeResource');
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    });
};

{/*________________________EDIT ACTIVE-INACTIVE OFFICE RESOURCE____________________________________*/ }
export const useEditActiveInactiveOfficeResource = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['editofficeResourceActiveInactive'],
    (formData) => editofficeResourceActiveInactive(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully edited status of office Logistics');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getofficeResource');
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    });
};

{/*________________________EDIT ACTIVE-INACTIVE OFFICE RESOURCE____________________________________*/ }
export const useEditInactiveOfficeResource = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['editofficeResourceInactive'],
    (formData) => editofficeResourceInactive(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully edited status of office Logistics');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('getofficeResource');
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    });
};