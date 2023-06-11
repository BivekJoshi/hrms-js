import { useState } from 'react';
import { useFormik } from 'formik';

import { loginSchema } from './loginValidationSchema';
import { useLogin } from '../../api/login/useLogin';

export const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showValues, setShowValues] = useState({
    password: '',
    showPassword: false,
  });
  const { mutate } = useLogin({});
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoading(true);
      handleLogin(values);
    },
  });

  const handleLogin = (values) => {
    const { email, password } = values;
    mutate({ email, password }, { onSettled: () => setLoading(false) });
  };

  const handleClickShowPassword = () => {
    setShowValues({
      ...showValues,
      showPassword: !showValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return {
    handleLogin,
    formik,
    showValues,
    loading,
    handleMouseDownPassword,
    handleClickShowPassword,
  };
};
