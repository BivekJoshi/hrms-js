import React from "react";
import {
  useAddWorkShift,
  useAssignWorkShift,
  useUpdateWorkShiftStartDate,
} from "../employee/AddEmployeeWorkShift/useWorkShift";
import { useFormik } from "formik";
import { WorkShiftSchema } from "./WorkshiftValidation/WorkshiftValidation";

export const addWorkShiftForm = (onClose) => {
  const { mutate } = useAddWorkShift({});
  const formik = useFormik({
    initialValues: {
      scheduleName: "",
      startWeekDay: "",
      onOffList: [false, false, false, false, false, false, false],
    },
    validationSchema: WorkShiftSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = { ...values };
      mutate(formData, {
        onSuccess: (data) => {
          onClose();
          formik.resetForm();
        },
      });
    },
  });

  return { formik };
};

export const assignWorkShiftForm = (onClose, data) => {
  const { mutate } = useAssignWorkShift({});
  const formik = useFormik({
    initialValues: {
      employeeId: "",
      workScheduleId: data.id,
      scheduleStartDate: "",
    },
    // validationSchema: WorkShiftSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = { ...values };
      mutate(formData, {
        onSuccess: (data) => {
          onClose();
          formik.resetForm();
        },
      });
    },
  });

  return { formik };
};

export const useUpdateWorkShiftStartDateForm = (onClose, data, employeeId) => {
  const { mutate } = useUpdateWorkShiftStartDate({});
  const formik = useFormik({
    initialValues: {
      workScheduleEmployeeId: employeeId,
      startDate: data.startDate || "",
    },
    // validationSchema: WorkShiftSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = { ...values };
      mutate(formData, {
        onSuccess: (data) => {
          onClose();
          formik.resetForm();
        },
      });
    },
  });

  return { formik };
};
