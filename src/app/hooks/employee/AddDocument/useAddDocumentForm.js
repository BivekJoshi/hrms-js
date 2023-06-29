import { useFormik } from 'formik';
import { useAddDocument } from '../useDocument';

const useAddDocumentForm = ({ document }) => {
  const { mutate } = useAddDocument({});
  // console.log(document);
  const formik = useFormik({
    initialValues: {
      documentType: '',
      // files: [],
    },
    onSubmit: (values) => {
      values = { ...values, document };
      console.log(values);
      mutate(values);
    },
  });

  return { formik };
};

export default useAddDocumentForm;
