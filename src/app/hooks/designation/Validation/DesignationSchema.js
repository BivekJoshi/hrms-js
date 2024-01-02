import * as Yup from "yup";

const DesignationSchema = Yup.object().shape({
  positionName: Yup.string()
    .required("Designation Name is required")
    .min(3, "Designation Name must be at least 3 characters"),
  positionLevel: Yup.string().required("Designation Level is required"),
  salary: Yup.string()
    .required("Salary is required")
    .matches(/^[0-9]+$/, "Salary must be a valid number"),
  // positionDetails: Yup.string().required("Designation details is required"),
});
export { DesignationSchema };
