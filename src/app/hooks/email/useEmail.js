import { useMutation, useQueryClient } from "react-query";
import { addEmailConfigure, sendEmail, sendEmailForHoliday, sendEmailToAll, sendEmailToMultipleEmployee } from "../../api/email/email-api";
import { toast } from "react-toastify";

/*___________________SEND EMAIL FOR PERTICULAR EMPLOYEE ON BASIS OF ID______________________________________*/
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

/*___________________SEND EMAIL FOR MULTIPLE EMPLOYEE ON BASIS OF ID______________________________________*/
export const useSendEmailToMultipleEmployee = ({ onSuccess, employeeId }) => {
  return useMutation(
    ["sendEmailToMultipleEmployee"],
    (formData) => sendEmailToMultipleEmployee({ formData, employeeId}),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully Send Mail To Selected Employee");
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};

/*___________________SEND EMAIL TO ALL EMPLOYEE______________________________________*/
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

/*___________________SEND EMAIL TO ALL EMPLOYEE FOR HOLIDAY______________________________________*/
export const useSendEmailForHoliday = ({ onSuccess, employeeId, holidayId }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["sendEmailForHoliday"],
    (formData) => sendEmailForHoliday({ formData, employeeId, holidayId }),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully Send Mail To All The Employee");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("sendEmailForHoliday");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};




{
  /*________________________POST FOR EMAIL CONFIGURATION_____________________________________*/
}
export const useEmailConfigure = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(['addEmailConfigure'], (formData) => addEmailConfigure(formData), {
    onSuccess: (data, variables, context) => {
      toast.success('Succesfully added email configuration');
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries('addEmailConfigure');
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};