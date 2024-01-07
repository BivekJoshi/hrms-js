import { useFormik } from 'formik';
import { useAddEmploymentHistory } from './useEmployeeHistory';
import EmploymentSchema from './AddEmploymentHistory/EmploymentSchema';

const useEmploymentHistory = (onClose) => {
  const { mutate } = useAddEmploymentHistory({});
  const formik = useFormik({
    initialValues: {
      positionId: '',
      branchId: '',
      departmentId: '',
      effectiveDateFrom: '',
      effectiveDateTo: '',
      remarks: '',
    },
    // validationSchema: EmploymentSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  console.log(
    '🚀 ~ file: useEmploymentHistory.js:21 ~ useEmployeeHistoryForm ~ formik:',
    formik
  );

  const handleRequest = (values) => {
    console.log(
      '🚀 ~ file: useEmploymentHistory.js:23 ~ handleRequest ~ values:',
      values
    );
    values = {
      ...values,
    };
    mutate(values, {
      onSuccess: () => {
        onClose();
        formik.handleReset();
      },
    });
  };

  return { formik };
};
export default useEmploymentHistory;
