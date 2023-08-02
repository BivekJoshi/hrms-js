import React, { useState } from "react";
import { useFormik } from "formik";
import { useAddResetPassword, useGetLoggedInUser } from "../usePassword";
import { ResetPasswordSchema } from "./ResetPasswordSchema";

const useAddForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [showValues, setShowValues] = useState({
    password: "",
    showPassword: false,
  });
  const { data: loggedInUser } = useGetLoggedInUser();

  const { mutate } = useAddResetPassword({});

  const formik = useFormik({
    initialValues: {
      id: loggedInUser?.id,
      password: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      setLoading(true);
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(
      values,
      formik,
      { onSuccess: () => formik.handleReset() },
      { onSettled: () => setLoading(false) }
    );
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
    formik,
    loading,
    showValues,
    handleClickShowPassword,
    handleMouseDownPassword,
  };
};

export default useAddForgotPasswordForm;
