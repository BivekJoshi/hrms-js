import { useMutation, useQueryClient } from "react-query";
import { sendEmail, sendEmailToAll } from "../../api/email/email-api";
import { toast } from "react-toastify";

export const useSendEmail = ({ employeeId, onSuccess }) => {
  
  const queryClient = useQueryClient();

  return useMutation(
    ["sendEmail"],
    (formData) => sendEmail({ formData, employeeId }),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successful send Mail");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("sendEmail");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};


export const useSendEmailToAll = ({ onSuccess, employeeId }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["sendEmailToAll"],
    (formData) => sendEmailToAll({ formData, employeeId }),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successful send Mail To All The Employee");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("sendEmailToAll");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};