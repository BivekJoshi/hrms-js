import { useFormik } from 'formik';
import { useActivateLeaveType, useDeactivateLeaveType } from '../../../hooks/leaveType/useLeaveType';

export const useDeactivateLeaveTypeForm = (data, onClose) => {
    const { mutate } = useDeactivateLeaveType({});
    const formik = useFormik({
        initialValues: {
            data: data || "",
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return { formik };
};

export const useActivateLeaveTypeForm = (data, onClose) => {
    const { mutate } = useActivateLeaveType({});
    const formik = useFormik({
        initialValues: {
            data: data || "",
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return { formik };
};