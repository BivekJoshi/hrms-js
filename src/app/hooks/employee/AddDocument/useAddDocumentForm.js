import { useFormik } from 'formik';
import { useAddDocument } from '../useDocument';

export const useAddDocumentForm = ({ document }) => {
  const { mutate } = useAddDocument({});

  const formik = useFormik({
    initialValues: {
      documentType: '',
    },
    onSubmit: (values) => {
      values = { ...values, document };
      mutate(values);
    },
  });

  return { formik };
};