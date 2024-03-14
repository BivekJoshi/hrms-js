import * as Yup from "yup";

const DesignationSchema = Yup.object().shape({
  positionName: Yup.string()
    .required("Designation Name is required")
    .min(3, "Designation Name must be at least 3 characters")
    .max(50, "Designation Name cannot be greater than 50 characters"),
  positionLevel: Yup.string()
    .required("Designation Level is required")
    .min(3, "Designation Level must be at least 3 characters")
    .max(50, "Designation Level cannot be greater than 50 characters"),
  salary: Yup.string()
    .required("Salary is required")
    .max(10, "Salary cannot be greater than 10 length")
    .matches(/^[0-9]+$/, "Salary must be a valid number"),
  positionDetails: Yup.string().max(
    255,
    "Designation Details cannot be greater than 255 characters"
  ),
});
export { DesignationSchema };
