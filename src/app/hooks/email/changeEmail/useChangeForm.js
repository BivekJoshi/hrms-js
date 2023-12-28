import React from 'react';
import { useChangeEmail } from '../useEmail';
import { useFormik } from 'formik';
import changeEmailSchema from './changeEmailSchema';
import { removeUser } from '../../../utils/cookieHelper';
import { useNavigate } from 'react-router-dom';

export const useChangeForm = () => {
  const { mutate: changeEmail } = useChangeEmail({});
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      newEmail: '',
      confirmEmail: '',
    },
    validationSchema: changeEmailSchema,
    // enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  const handleRequest = ({ newEmail }) => {
    const values = { newEmail };
    changeEmail(values, formik, {
      onSuccess: () => {
        removeUser();
        navigate('/');
        formik.resetForm();
      },
    });
  };
  return { formik };
};

export const useResendForm = () => {
  const { mutate: resendEmail } = useResendEmail({});
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      newEmail: '',
      confirmEmail: '',
    },
    // validationSchema: resendEmailSchema,
    // enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  const handleRequest = ({ newEmail }) => {
    const values = { newEmail };
    resendEmail(values, formik, {
      onSuccess: () => {
        // removeUser();
        // navigate('/');
        // formik.resetForm();
      },
    });
  };
  return { formik };
};
