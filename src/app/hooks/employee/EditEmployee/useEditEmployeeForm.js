import React from 'react';
import { useEditEmployee } from '../useEmployee';
import { EditEmployeeSchema } from './EditEmployeeSchema';
import { useFormik } from 'formik';

const useEditEmployeeForm = () => {
  const { mutate } = useEditEmployee({});

  const formik = useFormik({
    initialValues: {
      firstName: '',
    },
    validationSchema: EditEmployeeSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values);
  };

  return { formik };
};

export default useEditEmployeeForm;
