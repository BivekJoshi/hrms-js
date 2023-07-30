import { useFormik } from 'formik';
import { useAddOfficeResource } from './useOfficeResource';

const useOfficeResourceForm = () => {
  const { mutate } = useAddOfficeResource({});

  const formik = useFormik({
    initialValues: {
      name: '',
      uniqueNumber: '',
      description: '',
    },
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, formik, { onSuccess: () => formik.handleReset() });
  };

  return { formik };
};

export default useOfficeResourceForm;