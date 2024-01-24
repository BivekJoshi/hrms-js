import { useMutation, useQuery } from "react-query";
import {
  // getEmailLog,
  getEmailLogByFilter, postResentEmail,
} from "../../api/emailLog/EmailLog-api";
import { toast } from "react-toastify";

// export const useGetEmailLog = () => {
//   return useQuery(["getEmailLog"], () => getEmailLog(), {
//     refetchInterval: false,
//     refetchOnWindowFocus: false,
//   });
// };

export const useGetEmailLogByFilter = (userId,id,userIdFromEmailLog) => {
  return useQuery(["getEmailLogByFilter"], () => getEmailLogByFilter(userId,id,userIdFromEmailLog), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const usePostResendEmail = ({ onSuccess,passId,emailType }) => {

  return useMutation(['postResentEmail'], (formData) => postResentEmail(formData,passId,emailType), {
    onSuccess: (data, variables, context) => {
      toast.success('Successfully resend email');
      onSuccess && onSuccess(data, variables, context);
    },
  });
};
