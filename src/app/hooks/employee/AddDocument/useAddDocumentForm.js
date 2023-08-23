import { useFormik } from "formik";
import { useAddDocument } from "../useDocument";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  documentType: Yup.string().required("Document type is required"),
});

export const useAddDocumentForm = ({ document }) => {
  const { mutate } = useAddDocument({});

  const formik = useFormik({
    initialValues: {
      documentType: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values = { ...values, document };
      mutate(values);
    },
  });

  return { formik };
};
