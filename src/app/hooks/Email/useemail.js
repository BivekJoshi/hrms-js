import { useMutation, useQueryClient } from "react-query";
import { sendEmail } from "../../api/Email/Email-api";
import { toast } from "react-toastify";
export const useSendEmail = () => {
  const queryClient = useQueryClient();

  return useMutation(["sendEmail"], () => sendEmail(), {
    onSuccess: (data, variables, context) => {
      toast.success("Successful send Mail");
      // Perform any additional logic on success
      queryClient.invalidateQueries("sendEmail");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};
