import * as Yup from "yup";

const DesignationSchema = Yup.object().shape({
  positionName: Yup.string()
    .required("position Name is Required")
    .min(3, "position Name must be at least 3 characters")
    .matches(/^[^0-9]*$/, " position Level cannot contain numbers"),
  positionLevel: Yup.string().required("position Level is Required"),
  salary: Yup.string().required(" salary is Required"),
});

export { DesignationSchema };
