import * as Yup from "yup";

const ChangeEmailSchema = Yup.object().shape({
  newEmail: Yup.string().required("New Email is required"),
  confirmEmail: Yup.string()
    .required("Confirm Email is required")
    // .oneOf([Yup.ref("newEmail")], "New Email and Confirm Email must match")
});

export { ChangeEmailSchema };
