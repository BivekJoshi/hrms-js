import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addforgotPassword } from "../../../api/auth/forgot-password-api";

/*________________________POST_____________________________________*/
export const useAddForgotPassword = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(["forgotPassword"], (formData) => addforgotPassword(formData), {
      onSuccess: (data, variables, context) => {
        toast.success("Your new password has been sent to your email");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("forgotPassword");
      },
      onError: (err, _variables, _context) => {
        toast.error(`error: ${err.message}`);
      },
    });
  };