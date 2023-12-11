import { useFormik } from "formik";
import { useAddLeave, useEditLeave } from "../useLeave";
import { LeaveSchema } from "../Validation/LeaveSchema";
import { useGetLoggedInUser } from "../../auth/usePassword";

const useApplyLeaveForm = (data) => {
  const { mutate: addLeave } = useAddLeave({});
  const { mutate: editLeave } = useEditLeave({});
  const { data: userData } = useGetLoggedInUser();

  const formik = useFormik({
    initialValues: {
      id: data?.id,
      isHalfDay: data?.applyLeaveDays === 0.5 ? true : false,
      employeeId: userData?.employeeId || "",
      leaveTypeId: data?.leaveTypeId || "",
      leaveReason: data?.leaveReason || "",
      fromDate: data?.fromDate || "",
      toDate: data?.toDate || "",
      halfLeaveType: data?.halfLeaveType || "NONE",
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
