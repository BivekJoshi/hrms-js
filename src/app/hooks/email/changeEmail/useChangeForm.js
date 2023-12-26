import React from "react";
import { useChangeEmail } from "../useEmail";
import { useFormik } from "formik";
import { ChangeEmailSchema } from "./changeEmailSchema";

const useChangeForm = () => {
  const { mutate: changeEmail } = useChangeEmail({});
  const formik = useFormik({
    initialValues: {
      newEmail: "",
      confirmEmail: "",
    },
    validationSchema: ChangeEmailSchema,
    // enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  console.log(formik);
  const handleRequest = ({ newEmail }) => {
    const values = { newEmail };
    changeEmail(values, formik, {
      onSuccess: () => {
        formik.resetForm();
      },
    });
  };
  return { formik };
};

export default useChangeForm;
