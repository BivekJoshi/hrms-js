import * as Yup from "yup";

const EmploymentTypeSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .min(50, "Name cannot be greater than 50 characters"),
  description: Yup.string().max(255, "Description cannot be greater than 255 characters"),
});

export { EmploymentTypeSchema };
