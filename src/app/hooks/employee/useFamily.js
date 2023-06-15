import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { addfamily } from '../../api/family/family-api';
import { useParams } from 'react-router-dom';



export const useAddFamily = ({ onSuccess }) => {
    const { id } = useParams();
    return useMutation(['addFamily'],
        (formData) => addfamily(formData, id),
        {
            onSuccess: (data, variables, context) => {
                toast.success('Successfully added Family Member');
                onSuccess && onSuccess(data, variables, context);
            },
            onError: (err, _variables, _context) => {
                toast.error(`error: ${err.message}`);
            },
        });
};

// export const useGetFammilyById = (id) => {
//     return useQuery(['getFamilyById', id], () => getFamilyById(id), {
//       refetchInterval: false,
//       refetchOnWindowFocus: false,
//     });
//   };