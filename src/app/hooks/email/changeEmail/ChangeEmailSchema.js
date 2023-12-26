import * as Yup from "yup";

const ChangeEmailSchema = Yup.object().shape({
  newEmail: Yup.string().required("New Email is required"),
});

export { ChangeEmailSchema };
