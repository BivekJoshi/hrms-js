import React, { useState } from "react";
import { useFormik } from "formik";
import { useAddRenamePassword } from "../usePassword";

const useAddRenamePasswordForm = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [showValues, setShowValues] = useState({
    password: "",
    showPassword: false,
  });

  const { mutate } = useAddRenamePassword({});

  const formik = useFormik({
    initialValues: {
      password: "",
    },
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
      { ...values, id },
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

export default useAddRenamePasswordForm;