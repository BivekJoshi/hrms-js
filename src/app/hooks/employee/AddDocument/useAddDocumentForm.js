import { useFormik } from 'formik';
import { useAddDocument, useEditDocument } from '../useDocument';

export const useAddDocumentForm = ({ selectedDocument }) => {
  const { mutate } = useAddDocument({});
  const formik = useFormik({
    initialValues: {
      documentType: '',
    },
    enableReinitialize: "true",
    onSubmit: (values) => {
      values = { ...values, document: selectedDocument };
      mutate(values);
    },
  });

  return { formik };
};