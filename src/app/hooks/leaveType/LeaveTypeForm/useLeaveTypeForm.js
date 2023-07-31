import { useFormik } from "formik";
import { useAddLeaveType, useEditLeaveType } from "../useLeaveType";
import { LeaveTypeSchema } from "../Validation/LeaveTypeScheme";

const useLeaveTypeForm = (data) => {
  const { mutate: addLeaveType } = useAddLeaveType({});
  const { mutate: editLeaveType } = useEditLeaveType({});

  const formik = useFormik({
    initialValues: {
      leaveName: data?.leaveName || "",
      leaveTotal: data?.leaveTotal || "",
      leaveDescription: data?.leaveDescription || "",
      isCarryForward: data?.isCarryForward || false,
      id: data?.id,
    },
    validationSchema: LeaveTypeSchema,
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
    addLeaveType(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editLeaveType(values, formik);
  };
  return { formik };
};

export default useLeaveTypeForm;
