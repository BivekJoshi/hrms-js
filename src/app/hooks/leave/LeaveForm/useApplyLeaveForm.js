import { useFormik } from "formik";
import { useAddLeave, useEditLeave } from "../useLeave";
import { EditLeaveSchema, LeaveSchema } from "../Validation/LeaveSchema";
import { useGetLoggedInUser } from "../../auth/usePassword";
import { useGetLoggedInUserInfo } from '../../employee/useEmployee';
import { useNavigate } from 'react-router-dom';

const useApplyLeaveForm = (data) => {
  const { mutate: addLeave } = useAddLeave({});
  const { mutate: editLeave } = useEditLeave({});
  const { data: userData } = useGetLoggedInUser();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: data?.id,
      isHalfDay: data?.applyLeaveDays === 0.5 ? true : false,
      employeeId: userData?.employeeId || "",
      leaveTypeId: data?.leaveType?.id || "",
      leaveReason: data?.leaveReason || "",
      fromDate: data?.fromDate || "",
      toDate: data?.toDate || "",
      halfLeaveType: data?.halfLeaveType || "NONE",
      leaveStatus: data?.leaveStatus || "PENDING",
      leaveRemarks: data?.leaveRemarks || "",
      leavePeriod: '',
    },
    validationSchema: data ? EditLeaveSchema : LeaveSchema,
    enableReinitialize: true,
    // onSubmit: (values, { resetForm }) => {
      onSubmit: (values) => {
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
      // resetForm();
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addLeave(values, formik, {
      onSuccess: () => {
        
        formik.handleReset();
      }
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editLeave(values, formik, {
      onSuccess: () => {
        formik.handleReset();
      }
    });
  };

  return { formik };
};
export default useApplyLeaveForm;
