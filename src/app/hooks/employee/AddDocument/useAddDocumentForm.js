import { useFormik } from 'formik';
import { useAddDocument } from '../useDocument';

const useAddDocumentForm = () => {
  const { mutate } = useAddDocument({});
  const formik = useFormik({
    initialValues: {
      documentType: '',
      files: [],
    },
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

  return formik;
};

export default useAddDocumentForm;
