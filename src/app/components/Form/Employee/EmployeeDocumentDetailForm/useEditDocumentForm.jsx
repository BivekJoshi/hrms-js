import React from "react";
import { useFormik } from "formik";
import { useEditDocument } from "../../../../hooks/employee/useDocument";

const  useEditDocumentForm = (data, fileId) => {
    const { mutate } = useEditDocument({});
console.log({"data":data})
  const formik = useFormik({
    initialValues: {
      document: "",
    },
    enableReinitialize: "true",

    onSubmit: (values) => {
      values = { ...values, document: data?.file, fileId: fileId };
      mutate(values);
    },
  });

  return { formik };
};

export default useEditDocumentForm;