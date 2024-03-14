import React from "react";
import { useFormik } from "formik";
import { useEditDocument } from "../../../../hooks/employee/useDocument";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  data: Yup.mixed().required('Please upload document'),
});

const useEditDocumentForm = (id, data, onClose) => {
  const { mutate } = useEditDocument({});

  const formik = useFormik({
    initialValues: {
      data,
      id,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleRequest(values);
      onClose();
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    mutate(values, formik);
  };

  return { formik };
};

export default useEditDocumentForm;