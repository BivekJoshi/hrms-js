import * as Yup from "yup";

const EmploymentTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  // description: Yup.string().required("Description is required"),
});

export { EmploymentTypeSchema };
