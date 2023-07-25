import { useMutation, useQueryClient } from "react-query";
import { sendEmail, sendEmailToAll } from "../../api/email/email-api";
import { toast } from "react-toastify";

{/*___________________SEND EMAIL FOR PERTICULAR EMPLOYEE ON BASIS OF ID______________________________________*/}
export const useSendEmail = ({ employeeId, onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["sendEmail"],
    (formData) => sendEmail({ formData, employeeId }),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully Send Mail");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("sendEmail");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};

{/*___________________SEND EMAIL TO ALL EMPLOYEE______________________________________*/}
export const useSendEmailToAll = ({ onSuccess, employeeId, eventId }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["sendEmailToAll"],
    (formData) => sendEmailToAll({ formData, employeeId, eventId }),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully Send Mail To All The Employee");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("sendEmailToAll");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};