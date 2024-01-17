import React, { useState } from "react";
import { useFormik } from "formik";
import { useAddResetPassword, useGetLoggedInUser } from "../usePassword";
import ResetPasswordSchema from "./ResetPasswordSchema";

const useAddForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [showValues, setShowValues] = useState({
    oldPassword: "",
    password: "",
    showPassword: false,
  });
  const { data: loggedInUser } = useGetLoggedInUser();
  const id = loggedInUser?.id;
  const { mutate } = useAddResetPassword({ id });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      setLoading(true);
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    const { oldPassword, password } = values;
    mutate(
      { oldPassword, password, id },
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
