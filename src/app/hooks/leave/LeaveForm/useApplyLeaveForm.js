import { useFormik } from "formik";
import { useAddLeave, useEditLeave } from "../useLeave";
import { LeaveSchema } from "../Validation/LeaveSchema";

const useApplyLeaveForm = (data) => {
  const { mutate: addLeave } = useAddLeave({});
  const { mutate: editLeave } = useEditLeave({});

  const formik = useFormik({
    initialValues: {
      leaveTypeId: data?.leaveTypeId || "",
      leaveReason: data?.leaveReason || "",
      fromDate: data?.fromDate || "",
      toDate: data?.toDate || "",
      isHalfDay: data?.isHalfDay || false,
      leaveStatus: data?.leaveStatus || "PENDING",
      leaveRemarks: data?.leaveRemarks || "",
    },
    validationSchema: LeaveSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (data?.id) {
        await handledEditRequest(values);
      } else {
        await handleRequest(values);
      }
      resetForm();
    },
  });

  const handleRequest = async (values) => {
    values = { ...values };
    await addLeave(values, formik);
  };

  const handledEditRequest = async (values) => {
    values = { ...values };
    await editLeave(values, formik);
  };

  return { formik };
};
export default useApplyLeaveForm;
