import { useFormik } from 'formik';
import { useAddDesignation } from '../useDesignation';
import { addDesignationSchema } from './addDesigationSchema';

const useAddDepartmentForm = () => {
  const { mutate } = useAddDesignation({});

  const formik = useFormik({
    initialValues: {
      positionName: '',
      positionLevel: '',
      salary: '',
      positionDetails: '',
    },
    validationSchema: addDesignationSchema,
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

export default useAddDepartmentForm;
