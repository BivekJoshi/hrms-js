import { useMutation, useQuery, useQueryClient } from "react-query";
import { addEmployeeHistory, deleteEmployeeHistory, getEmployeeHistoryById } from "../../api/employeeHistory/employeeHistory";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

{/*________________________GETBYID_____________________________________*/ }
export const useGetEmployeeHistoryById = (id) => {
    return useQuery(['getEmployeeHistoryById', id], () => getEmployeeHistoryById(id), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
};

{/*________________________POST_____________________________________*/ }
export const useAddEmployeeHistory = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    return useMutation(['addEmployeeHistory'],
        (formData) => addEmployeeHistory(formData, id),
        {
            onSuccess: (data, variables, context) => {
                toast.success('Successfully added family History');
                onSuccess && onSuccess(data, variables, context);
                queryClient.invalidateQueries('getEmployeeHistoryById');
            },
            onError: (err, _variables, _context) => {
                toast.error(`error: ${err.message}`);
            },
        });
};

{/*________________________DELETE_____________________________________*/ }
export const useDeleteHistory = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(['deleteEmployeeHistory'],
        (employeeHistoryId) => deleteEmployeeHistory(employeeHistoryId),
        {
            onSuccess: (data, variables, context) => {
                toast.success('Employee History deleted successfully');
                onSuccess && onSuccess(data, variables, context);
                queryClient.invalidateQueries('getEmployeeHistoryById');
            },
            onError: (err, _variables, _context) => {
                toast.error(`Error: ${err.message}`);
            },
        }
    );
};