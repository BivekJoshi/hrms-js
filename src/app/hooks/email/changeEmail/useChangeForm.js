import React from "react";
import { useChangeEmail } from "../useEmail";
import { useFormik } from "formik";
import { ChangeEmailSchema } from "./changeEmailSchema";

const useChangeForm = () => {
  const { mutate: changeEmail } = useChangeEmail({});
  const formik = useFormik({
    initialValues: {
      newEmail: "",
    },
    validationSchema: ChangeEmailSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    changeEmail(values, formik, {
      onSuccess: () => {
        formik.resetForm();
      },
    });
  };
  return { formik };
};

export default useChangeForm;
