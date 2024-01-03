import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { addDepartmentHistory, getDepartmentHistory } from '../../api/department/department-api';

{/*________________________GET_____________________________________*/ }
export const useGetDepartmentHistory = (id) => {
    return useQuery(['getDepartmentHistory',id], () => getDepartmentHistory(id), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
};

{/*________________________POST_____________________________________*/ }
export const useAddDepartmentHistory = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(['addDepartmentHistory'], (formData) => addDepartmentHistory(formData), {
        onSuccess: (data, variables, context) => {
            toast.success('Succesfully added department history of employee');
            onSuccess && onSuccess(data, variables, context);
            queryClient.invalidateQueries('getDepartmentHistory');
        },
        onError: (err, _variables, _context) => {
            toast.error(`error: ${err.message}`);
        },
    });
};