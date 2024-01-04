import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  addRenamePassword,
  addResetPassword,
  addforgotPassword,
  getLoggedInUser,
} from '../../api/auth/password-api';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../utils/cookieHelper';

{
  /*________________________GET-LOGGED-IN-USER_____________________________________*/
}
export const useGetLoggedInUser = () => {
  return useQuery(['getLoggedInUser'], () => getLoggedInUser(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET-USER-BY-ID_____________________________________*/
}
export const useGetEventById = (id) => {
  return useQuery(['getUserById', id], () => getUserById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddForgotPassword = ({ onSuccess }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    ['forgotPassword'],
    (formData) => addforgotPassword(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Your new password has been sent to your email');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('forgotPassword');
        navigate('/');
      },
      onError: (err, _variables, _context) => {
        // toast.error(`error: ${err.message}`);
      },
    }
  );
};

/*________________________PUT_____________________________________*/
export const useAddResetPassword = ({ id, onSuccess }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    ['resetPassword'],
    (formData) => addResetPassword(id, formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Password has been Changed Successfully');
        onSuccess && onSuccess(data, variables, context);
        // queryClient.invalidateQueries("resetPassword");
        removeUser();
        navigate('/');
      },
    }
  );
};

/*________________________PUT_____________________________________*/
export const useAddRenamePassword = ({ onSuccess }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    ['resetPassword'],
    (formData) => addRenamePassword(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success('Password has been Created Successfully');
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries('resetPassword');
        navigate('/');
      },
    }
  );
};
