import { useFormik } from "formik";
import { useAddLeaveType, useEditLeaveType } from "../useLeaveType";
import { LeaveTypeSchema } from "../Validation/LeaveTypeScheme";
import { toast } from "react-toastify";
import { isEqual } from 'lodash';

const useLeaveTypeForm = (data, onClose) => {
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
    enableReinitialize: true,
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
    addLeaveType(values, {
      onSuccess: () => {
        onClose();
        formik.resetForm();
      },
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    if (!isEqual(values, formik.initialValues)) {
      editLeaveType(values, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (isEqual(values, formik.initialValues)) {
      toast.warning("No changes were made");
      onClose();
    }
  };
  return { formik };
};

export default useLeaveTypeForm;
