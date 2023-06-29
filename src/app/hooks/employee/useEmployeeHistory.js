import { useMutation, useQuery, useQueryClient } from "react-query";
import { addEmployeeHistory, getEmployeeHistoryById } from "../../api/employeeHistory/employeeHistory";
import { useParams } from "react-router-dom";

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
export const useDeleteFamily = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(['deleteFamily'],
        (employeeHistoryId) => deleteEmployeeHistory(memberId),
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