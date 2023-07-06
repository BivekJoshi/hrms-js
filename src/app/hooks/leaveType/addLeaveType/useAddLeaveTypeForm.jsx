import { useFormik } from 'formik';
import { useAddLeaveType } from '../useLeaveType';
import { LeaveTypeSchema } from '../Validation/LeaveTypeScheme';

const useAddLeaveTypeForm = () => {
  const { mutate } = useAddLeaveType({});

  const formik = useFormik({
    initialValues: {
      leaveName: '',
      leaveTotal: '',
      leaveDescription: '',
      isCarryForward: false,
    },
    validationSchema: LeaveTypeSchema,
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
