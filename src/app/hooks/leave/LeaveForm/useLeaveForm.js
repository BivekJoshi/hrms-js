import { useFormik } from 'formik';
import {
  useAddLeave,
  useAddLeaveByAdmin,
  useEditLeave,
  useEditLeaveByAdmin,
} from '../useLeave';
import { LeaveSchema } from '../Validation/LeaveSchema';

const useLeaveForm = (data) => {
  const { mutate: addLeave } = useAddLeaveByAdmin({});
  const { mutate: editLeave } = useEditLeaveByAdmin({});

  const formik = useFormik({
    initialValues: {
      employeeId: data?.employeeId || '',
      leaveTypeId: data?.leaveTypeId || '',
      leaveReason: data?.leaveReason || '',
      fromDate: data?.fromDate || '',
      toDate: data?.toDate || '',
      leaveStatus: data?.leaveStatus || 'PENDING',
      leaveRemarks: data?.leaveRemarks || '',
      isHalfDay: data?.isHalfDay || false,
      applyLeaveDays: data?.applyLeaveDays || '',
      id: data?.leaveId || '',
    },
    validationSchema: LeaveSchema,
    enableReinitialize: 'true',
    onSubmit: (values) => {
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addLeave(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editLeave(values, formik);
  };
  return { formik };
};

export default useLeaveForm;
