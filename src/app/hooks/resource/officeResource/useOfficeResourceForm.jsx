import { useFormik } from 'formik';
// import { DepartmentSchema } from '../Validation/DepartmentSchema';
import { useAddOfficeResource } from './useOfficeResource';

const useOfficeResourceForm = () => {
  const { mutate } = useAddOfficeResource({});

  const formik = useFormik({
    initialValues: {
      name: '',
      uniqueNumber: '',
      description: '',
    },
    // validationSchema: DepartmentSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, formik);
  };

  return { formik };
};

export default useOfficeResourceForm;