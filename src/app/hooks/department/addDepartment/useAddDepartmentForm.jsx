import { useFormik } from 'formik';
import { useAddDepartment } from '../../useDepartment';
import { DepartmentSchema } from '../Validation/DepartmentSchema';

const useAddDepartmentForm = () => {
  const { mutate } = useAddDepartment({});

  const formik = useFormik({
    initialValues: {
      departmentName: '',
      departmentType: '',
      departmentDescription: '',
    },
    validationSchema: DepartmentSchema,
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
