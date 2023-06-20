import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export const useAddMessage = ({ onSuccess }) => {
    return useMutation(["addMessage"], (formData) => addMessage(formData), {
        onSuccess: (data, variable, context) => {
            toast.success("Message added successfully");
            onSuccess && onSuccess(data, variable, context);
        },
        onError: (err, _variable, _context) => {
            toast.error(`error: ${err.message}`);
        }
    })
}