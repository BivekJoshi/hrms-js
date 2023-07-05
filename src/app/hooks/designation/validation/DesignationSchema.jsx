import * as Yup from "yup";

const DesignationSchema = Yup.object().shape({
  designationName: Yup.string()
    .required("Designation Name is Required")
    .min(3, "Designation Name must be at least 3 characters"),
  designationLevel: Yup.string().required("Designation Level is Required"),
  salary: Yup.string().required("Salary is Required"),
  positionDetails: Yup.string().required("Details is Required"),
});
export { DesignationSchema };
