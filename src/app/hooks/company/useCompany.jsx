import { useMutation, useQuery } from 'react-query';
import { addCompany, deleteCompany, editCompany, getCompany, getCompanyById } from '../../api/company/company-api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

{/*________________________GET_____________________________________*/ }
export const useGetCompany = () => {
  return useQuery(['getCompany'], () => getCompany(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________GETBYID_____________________________________*/ }
export const useGetCompanyById = (id) => {
  return useQuery(['getCompanyById', id], () => getCompanyById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{/*________________________POST_____________________________________*/ }
export const useAddCompany = ({ onSuccess }) => {
  return useMutation(['addCompany'], (formData) => addCompany(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully added Company');
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{/*________________________DELETE_____________________________________*/ }
export const useDeleteCompany = ({ onSuccess }) => {
  return useMutation(['deleteCompany'], (companyId) => deleteCompany(companyId), {
    onSuccess: (data, variables, context) => {
      toast.success('Successfully deleted Company');
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};

{/*________________________EDIT_____________________________________*/ }
export const useEditCompany = ({ onSuccess }) => {
  const { id } = useParams();

  return useMutation(['editCompany'],
    (formData) => editCompany(formData, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully edited Company');
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    });
};
