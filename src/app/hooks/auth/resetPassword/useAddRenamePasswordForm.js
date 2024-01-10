import React, { useState } from "react";
import { useFormik } from "formik";
import { useAddRenamePassword } from "../usePassword";
import NewPasswordSchema from "./Validation/ValidateSchema";
import { removeUser } from "../../../utils/cookieHelper";
import { useNavigate } from "react-router-dom";

const useAddRenamePasswordForm = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showValues, setShowValues] = useState({
    password: "",
    showPassword: false,
  });

  const { mutate } = useAddRenamePassword({});

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: NewPasswordSchema,
    onSubmit: (values) => {
      setLoading(true);
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    const { password } = values;

    mutate(
      { password, id },
      formik,

      {
        onSuccess: () => {
          removeUser();
          navigate(`/`);
          formik.handleReset();
        },
      },
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
