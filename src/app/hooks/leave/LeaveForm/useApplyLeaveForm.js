import { useFormik } from "formik";
import { useAddLeave, useEditLeave } from "../useLeave";
import { LeaveSchema } from "../Validation/LeaveSchema";
import { useGetLoggedInUser } from "../../auth/usePassword";

const useApplyLeaveForm = (data) => {
  const { mutate: addLeave } = useAddLeave({});
  const { mutate: editLeave } = useEditLeave({});
  const {data: userData} = useGetLoggedInUser();

  console.log({"userData": userData})

  const formik = useFormik({
    initialValues: {
      employeeId: userData?.id||"",
      leaveTypeId: data?.leaveTypeId || "",
      leaveReason: data?.leaveReason || "",
      fromDate: data?.fromDate || "",
      toDate: data?.toDate || "",
      isHalfDay: data?.isHalfDay || false,
      halfLeaveType: data?.halfLeaveType || null,
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
