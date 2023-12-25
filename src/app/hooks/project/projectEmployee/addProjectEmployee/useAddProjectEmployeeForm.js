import React from "react";
import { useFormik } from "formik";
import { ProjectEmployeeSchema } from "../validation/ProjectEmployeeSchema";
import {
  useAddProjectEmployee,
  useEditProjectEmployee,
} from "../useProjectEmployee";
import { useParams } from "react-router-dom";

export const useProjectEmployeeForm = ({data, onClose}) => {
  const { id } = useParams();
  const { mutate: addProjectEmployee } = useAddProjectEmployee({});
  const { mutate: editProjectEmployee } = useEditProjectEmployee({});

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      assignedOn: data?.assignedOn || "",
      deAssignedOn: data?.deAssignedOn || "",
      employeeId: data?.employeeId || "",
      employeeName: data?.employeeName || "",
      projectId: data?.projectId || id || "",
      projectName: data?.projectName || "",
    },
    validationSchema: ProjectEmployeeSchema,
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
    addProjectEmployee(values, {
      onSuccess: () => {
        onClose();
        formik.resetForm();
      },
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editProjectEmployee(values, {
      onSuccess: () => {
        onClose();
        formik.handleReset();
        
      },
    });
  };
  return { formik };
};

// export const useAddProjectEmployeeForm = () => {
//   const { id } = useParams();
//   const { mutate } = useAddProjectEmployee({});

//   const formik = useFormik({
//     initialValues: {
//       assignedOn: "",
//       deAssignedOn: "",
//       employeeId: "",
//       projectId: id,
//     },
//     validationSchema: ProjectEmployeeSchema,
//     onSubmit: (values) => {
//       handleRequest(values);
//     },
//   });

//   const handleRequest = (values) => {
//     values = {
//       ...values,
//     };
//     mutate(values, formik, { onSuccess: () => formik.handleReset() });
//   };
//   return { formik };
// };

// export const useEditProjectEmployeeForm = (data, onCLose) => {
//   const { mutate } = useEditProjectEmployee({});

//   const formik = useFormik({
//     initialValues: {
//       id: data?.id || "",
//       assignedOn: data?.assignedOn || "",
//       deAssignedOn: data?.deAssignedOn || "",
//       employeeId: data?.employeeId || "",
//       employeeName: data?.employeeName || "",
//       projectId: data?.projectId || "",
//       projectName: data?.projectName || "",
//     },
//     validationSchema: ProjectEmployeeSchema,
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       handleRequest(values);
//     },
//   });
//   const handleRequest = (values) => {

//     values = { ...values };
//     mutate(values);
//   };
//   return { formik };
// };
