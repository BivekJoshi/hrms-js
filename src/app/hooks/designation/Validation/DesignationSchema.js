import * as Yup from "yup";

const DesignationSchema = Yup.object().shape({
  positionName: Yup.string()
    .required("Designation Name is Required")
    .min(3, "Designation Name must be at least 3 characters"),
  positionLevel: Yup.string().required("Designation Level is Required"),
  salary: Yup.string()
    .required("Salary is Required")
    .matches(/^[0-9]+$/, "Salary must be a valid number"),
  // positionDetails: Yup.string().required("Details is Required"),
});
export { DesignationSchema };
