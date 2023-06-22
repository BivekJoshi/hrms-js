import { useFormik } from 'formik';
import { useAddDesignation } from '../useDesignation';
import { DesignationSchema } from '../Validation/DesigationSchema';

const useAddDesignationForm = () => {
  const { mutate } = useAddDesignation({});

  const formik = useFormik({
    initialValues: {
      positionName: '',
      positionLevel: '',
      salary: '',
      positionDetails: '',
    },
    validationSchema: DesignationSchema,
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

export default useAddDesignationForm;
