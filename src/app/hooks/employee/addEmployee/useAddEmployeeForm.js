import React from 'react';
import { useAddEmployee } from '../useEmployee';
import { addEmployeeSchema } from './addEmployeeSchema';
import { useFormik } from 'formik';

const useAddEmployeeForm = () => {
  const { mutate } = useAddEmployee({});

  const formik = useFormik({
    initialValues: {
      firstName: '',
    },
    validationSchema: addEmployeeSchema,
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

export default useAddEmployeeForm;
