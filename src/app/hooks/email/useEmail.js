import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addChangeEmail,
  addEmailConfigure,
  getEmailConfigure,
  sendEmail,
  sendEmailForHoliday,
  sendEmailToAll,
  sendEmailToMultipleEmployee,
} from '../../api/email/email-api';
import { toast } from 'react-toastify';

/*___________________SEND EMAIL FOR PERTICULAR EMPLOYEE ON BASIS OF ID______________________________________*/
export const useSendEmail = ({ employeeId, onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['sendEmail'],
    (formData) => sendEmail({ formData, employeeId }),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully Send Mail');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('sendEmail');
      },
    }
  );
};

/*___________________SEND EMAIL FOR MULTIPLE EMPLOYEE ON BASIS OF ID______________________________________*/
export const useSendEmailToMultipleEmployee = ({ onSuccess, employeeId }) => {
  return useMutation(
    ['sendEmailToMultipleEmployee'],
    (formData) => sendEmailToMultipleEmployee({ formData, employeeId }),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully Send Mail To Selected Employee');
        onSuccess && onSuccess(data, variables, context);
      },
    }
  );
};

/*___________________SEND EMAIL TO ALL EMPLOYEE______________________________________*/
export const useSendEmailToAll = ({ onSuccess, employeeId, eventId }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['sendEmailToAll'],
    (formData) => sendEmailToAll({ formData, employeeId, eventId }),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully Send Mail To All The Employee');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('sendEmailToAll');
      },
    }
  );
};

/*___________________SEND EMAIL TO ALL EMPLOYEE FOR HOLIDAY______________________________________*/
export const useSendEmailForHoliday = ({
  onSuccess,
  employeeId,
  holidayId,
}) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['sendEmailForHoliday'],
    (formData) => sendEmailForHoliday({ formData, employeeId, holidayId }),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully Send Mail To All The Employee');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('sendEmailForHoliday');
      },
    }
  );
};

{
  /*________________________GET_____________________________________*/
}
export const useGetEmailConfigure = () => {
  return useQuery(['getEmailConfigure'], () => getEmailConfigure(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
{
  /*________________________POST FOR EMAIL CONFIGURATION_____________________________________*/
}
export const useEmailConfigure = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['addEmailConfigure'],
    (formData) => addEmailConfigure(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully changed email configuration');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('addEmailConfigure');
      },
    }
  );
};

/*________________________POST FOR Change EMAIL_____________________________________*/
export const useChangeEmail = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['addChangeEmail'],
    (formData) => addChangeEmail(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully changed email. Check your email to login');
        onSuccess && onSuccess(data, variables, context);
      },
    }
  );
};

/*________________________POST FOR RESEND EMAIL_____________________________________*/
export const useResendEmail = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['addChangeEmail'],
    (formData) => addChangeEmail(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Successfully resend email. Check email to login');
        onSuccess && onSuccess(data, variables, context);
      },
    }
  );
};
