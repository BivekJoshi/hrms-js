import React from "react";
import {
  useAddWorkShift,
  useAssignWorkShift,
  useUpdateWorkShiftStartDate,
} from "../employee/AddEmployeeWorkShift/useWorkShift";
import { useFormik } from "formik";
import {
  AddWorkShiftSchema,
  AssignWorkShiftSchema,
  UpdateWorkShiftSchema,
} from "./WorkshiftValidation/WorkshiftValidation";

export const addWorkShiftForm = (onClose) => {
  const { mutate } = useAddWorkShift({});
  const formik = useFormik({
    initialValues: {
      scheduleName: "",
      startWeekDay: "",
      onOffList: [
        { startTime: "", endTime: "", startLateTime: "", endEarlyTime: "" },
      ],
    },
    validationSchema: AddWorkShiftSchema,
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
    validationSchema: AssignWorkShiftSchema,
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

export const useUpdateWorkShiftStartDateForm = (onClose, data) => {
  const { mutate } = useUpdateWorkShiftStartDate({});
  const formik = useFormik({
    initialValues: {
      workScheduleEmployeeId: data.id,
      startDate: data.startDate || "",
    },
    validationSchema: UpdateWorkShiftSchema,
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
