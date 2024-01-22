import React from "react";
import { useFormik } from "formik";
import { useAddUserControl } from "../../../../hooks/auth/userControl/useUserControl";
import { UserAddSchema } from './userSchema/UserSchema';

export const useAddUserControlForm = (onClose) => {
  const { mutate } = useAddUserControl({});

  const formik = useFormik({
    initialValues: {
      employeeId: "",
    },
    // validationSchema: UserAddSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, {
      onSuccess: () => {
        onClose();
        formik.handleReset();
      },
    });
  };

  return { formik };
};
