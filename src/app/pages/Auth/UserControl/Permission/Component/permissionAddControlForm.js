import React from "react";
import { useFormik } from "formik";
import { useAddPermission } from "../../../../../hooks/auth/permission/usePermission";
import * as Yup from 'yup';

const permationValidation = Yup.object().shape({
  name: Yup.string()
    .required('Permission name is required'),

});

export const permissionAddControlForm = (props) => {
  const { mutate } = useAddPermission({});
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
    },
    validationSchema:permationValidation,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, formik, { onSuccess: () => formik.handleReset() });
  };

  return { formik };
};

