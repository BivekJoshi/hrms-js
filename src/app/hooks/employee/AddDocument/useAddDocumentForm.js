import { useFormik } from 'formik';
import { useAddDocument } from '../useDocument';

const useAddDocumentForm = ({ selectedDocument }) => {
  const { mutate } = useAddDocument({});

  const formik = useFormik({
    initialValues: {
      documentType: '',
    },
    onSubmit: (values) => {
      values = { ...values, document: selectedDocument };
      mutate(values);
    },
  });

  return { formik };
};

export default useAddDocumentForm;