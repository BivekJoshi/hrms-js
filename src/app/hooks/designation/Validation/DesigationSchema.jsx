import * as Yup from "yup";

const DesignationSchema = Yup.object().shape({
  positionName: Yup.string()
    .required("Designation Name is Required")
    .min(3, "Designation Name must be at least 3 characters")
    .matches(/^[^0-9]*$/, "Department Name cannot contain numbers"),
  // positionLevel: Yup.string().required('Designation Level is Required'),
  // salary: Yup.string().required('Designation Salary is Required'),
});

export { DesignationSchema };
