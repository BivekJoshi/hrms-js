import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addfamily, deleteFamily, editFamily, getFamilyById } from '../../api/family/family-api';
import { useParams } from 'react-router-dom';


{/*________________________POST_____________________________________*/ }
export const useAddFamily = ({ onSuccess }) => {
    const queryClient = useQueryClient();
     const { id } = useParams();
    return useMutation(['addFamily'],
        (formData) => addfamily(formData, id),
        {
            onSuccess: (data, variables, context) => {
                toast.success(`Successfully added family member`);
                onSuccess && onSuccess(data, variables, context);
                queryClient.invalidateQueries('getFamilyById');
            },
            onError: (err, _variables, _context) => {
                toast.error(`error: ${err.message}`);
            },
        });
};

{/*________________________GETBYID_____________________________________*/ }
export const useGetFammilyById = (id) => {
    return useQuery(['getFamilyById', id], () => getFamilyById(id), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
};

{/*________________________EDIT_____________________________________*/ }
export const useEditFamily = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    return useMutation(['editFamily'], (formData) => {
        editFamily(formData, id);
    },
        {
            onSuccess: (data, variables, context) => {
                toast.success('Family edited sucessfully');
                onSuccess && onSuccess(data, variables, context);
                queryClient.invalidateQueries('getFamilyById');
            },
            onError: (err, _variables, _context) => {
                toast.error(`error: ${err.message}`);
            },
        }
    );
};

{/*________________________DELETE_____________________________________*/ }
export const useDeleteFamily = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(['deleteFamily'],
        (memberId) => deleteFamily(memberId),
        {
            onSuccess: (data, variables, context) => {
                toast.success('Family member deleted successfully');
                onSuccess && onSuccess(data, variables, context);
                queryClient.invalidateQueries('getFamilyById');
            },
            onError: (err, _variables, _context) => {
                toast.error(`Error: ${err.message}`);
            },
        }
    );
};