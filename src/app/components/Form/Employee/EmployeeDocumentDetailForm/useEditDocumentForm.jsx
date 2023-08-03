import React from "react";
import { useFormik } from "formik";
import { useEditDocument } from "../../../../hooks/employee/useDocument";

const  useEditDocumentForm = (id,data) => {
  
    const { mutate } = useEditDocument({});

  const formik = useFormik({
    initialValues: {
     data,
     id,
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    mutate(values, formik);
  };

  return { formik };
};

export default useEditDocumentForm;