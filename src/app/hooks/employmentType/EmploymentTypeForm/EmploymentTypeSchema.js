import * as Yup from "yup";

const EmploymentTypeSchema = Yup.object().shape({
  name: Yup.string()
    .required("Employment type name is required")
    .min(3, "Employment type name must be at least 3 characters")
    .max(50, "Employment type name cannot be greater than 50 characters"),
  description: Yup.string().max(255, "Description cannot be greater than 255 characters"),
});

export { EmploymentTypeSchema };
