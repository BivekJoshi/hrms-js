import { useMutation, useQuery, useQueryClient } from "react-query";
import { addEmpHistory, addEmployeeHistory, deleteEmployeeHistory, editEmployeeHistory, getEmployeeHistory, getEmployeeHistoryById } from "../../api/employeeHistory/employeeHistory";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

{/*________________________GETBYID_____________________________________*/ }
export const useGetEmployeeHistoryById = (id) => {
    return useQuery(['getEmployeeHistoryById', id], () => getEmployeeHistoryById(id), {
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
};

{/*________________________GETBY EMPLOYEE HISTORY ID_____________________________________*/ }
export const useGetEmployeeHistory = (id) => {
    return useQuery(['getEmployeeHistory', id], () => getEmployeeHistory(id), {
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
                toast.success('Successfully added Employee History');
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

{/*________________________EDIT_____________________________________*/ }
export const useEditEmployeeHistory = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    return useMutation(['editEmployeeHistory'], (formData) => {
        editEmployeeHistory(formData, id);
    },
        {
            onSuccess: (data, variables, context) => {
                toast.success('Employee History edited sucessfully');
                onSuccess && onSuccess(data, variables, context);
                queryClient.invalidateQueries('useGetEmployeeHistoryById');
            },
            onError: (err, _variables, _context) => {
                toast.error(`error: ${err.message}`);
            },
        }
    );
};



{/*________________________POST-FOR-VIEW-DETAIL-ADD-PORTION_____________________________________*/ }
export const useAddEmpHistory = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    return useMutation(['addEmployeeHistory'],
        (formData) => addEmpHistory(formData, id),
        {
            onSuccess: (data, variables, context) => {
                toast.success('Successfully added Employee History');
                onSuccess && onSuccess(data, variables, context);
                queryClient.invalidateQueries('getEmployeeHistory');
            },
            onError: (err, _variables, _context) => {
                toast.error(`error: ${err.message}`);
            },
        });
};