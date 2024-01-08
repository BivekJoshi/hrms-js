import { useFormik } from "formik";
import {
  useAddLeave,
  useAddLeaveByAdmin,
  useEditLeave,
  useEditLeaveByAdmin,
  useEditLeaveStatusByAdmin,
} from "../useLeave";
import {
  EditLeaveSchemaAdmin,
  LeaveSchemaAdmin,
} from "../Validation/LeaveSchemaForAdmin";

const useLeaveForm = (data, onClose) => {
  const { mutate: addLeave, isSuccess } = useAddLeaveByAdmin({});

  const formik = useFormik({
    initialValues: {
      employeeId: data?.employeeId?.id || "",
      leaveTypeId: data?.leaveTypeId || "",
      leaveReason: data?.leaveReason || "",
      fromDate: data?.fromDate || "",
      toDate: data?.toDate || "",
      leaveRemarks: data?.leaveRemarks || "",
      isHalfDay: data?.isHalfDay || false,
      applyLeaveDays: data?.applyLeaveDays || "",
      halfLeaveType: "FIRST_HALF",
      id: data?.leaveId || "",
      leavePeriod: "",
    },
    validationSchema: LeaveSchemaAdmin,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addLeave(values, {
      onSuccess: () => {
        onClose();
        formik.resetForm();
      },
    });
  };

  if (isSuccess) {
    onClose();
    formik.resetForm();
  }

  return { formik };
};

const useLeaveEditForm = (data, onClose) => {
  const { mutate: editLeave, isSuccess } = useEditLeaveStatusByAdmin({});

  const formik = useFormik({
    initialValues: {
      id: data?.leaveId,
      employeeId: data?.employeeId || "",
      leaveStatus: "",
      leaveRemarks: "",
    },
    validationSchema: EditLeaveSchemaAdmin,
    onSubmit: (value) => {
      handledEditRequest(value);
    },
  });

  const handledEditRequest = async (values) => {
    const value = {
      id: values.id,
      leaveStatus: values.leaveStatus,
      leaveRemarks: values.leaveRemarks,
    };
    await editLeave(value, formik);
  };
  if (isSuccess) {
    onClose();
    formik.resetForm();
  }
  return { formik };
};

export { useLeaveForm, useLeaveEditForm };
