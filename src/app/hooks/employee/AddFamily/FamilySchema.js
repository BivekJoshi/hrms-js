import * as Yup from "yup";

const FamilySchema = Yup.object().shape({
  family: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        relation: Yup.string().required("Relation is required"),
        mobileNumber: Yup.string()
          .required("Mobile number is required")
          .matches(/^[0-9]{10}$/, "Invalid mobile number format"),
      })
    )
    .min(1, "Need at least a family"),
});

export { FamilySchema };
