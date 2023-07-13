import { useMutation, useQueryClient } from "react-query";
import { sendEmail } from "../../api/email/email-api";
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
