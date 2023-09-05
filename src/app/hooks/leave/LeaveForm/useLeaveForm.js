import { useFormik } from "formik";
import { useAddLeave, useAddLeaveByAdmin, useEditLeave } from "../useLeave";
import { LeaveSchema } from "../Validation/LeaveSchema";

const useLeaveForm = (data) => {
  const { mutate: addLeave } = useAddLeaveByAdmin({});
  const { mutate: editLeave } = useEditLeave({});

  const formik = useFormik({
    initialValues: {
      // employeeId: data?.employeeId || "",
      leaveTypeId: data?.leaveTypeId || "",
      leaveReason: data?.leaveReason || "",
      fromDate: data?.fromDate || "",
      toDate: data?.toDate || "",
      applyLeaveDays: data?.applyLeaveDays || "",
      leaveBalance: data?.leaveBalance || "",
      leaveStatus: data?.leaveStatus || "",
      confirmById: data?.confirmById || "",
      leaveRemarks: data?.leaveRemarks || "",
      halfDay: data?.halfDay || "",
      id: data?.id,
    },
    validationSchema: LeaveSchema,
    enableReinitialize: "true",
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
