import { useFormik } from 'formik';
import { useAddLeaveType } from '../useLeaveType';
import { addLeaveTypeSchema } from './addLeaveTypeScheme';

const useAddLeaveTypeForm = () => {
  const { mutate } = useAddLeaveType({});

  const formik = useFormik({
    initialValues: {
      leaveName: '',
      leaveTotal: '',
      leaveDescription: '',
      carryForward: '',
    },
    validationSchema: addLeaveTypeSchema,
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

export default useAddLeaveTypeForm;
