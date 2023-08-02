import React from "react";
import { useFormik } from "formik";
import { useEditDocument } from "../../../../hooks/employee/useDocument";

const  useEditDocumentForm = (data) => {
    const { mutate } = useEditDocument({});

  const formik = useFormik({
    initialValues: {
      id: data?.id,
    },
    enableReinitialize: "true",

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