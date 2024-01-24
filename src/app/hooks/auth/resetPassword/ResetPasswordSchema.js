import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters long.")
    .notOneOf(
      [Yup.ref("oldPassword")],
      "New password must be different from the old password."
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter."
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one digit (number).")
    .matches(
      /^(?=.*[@#$%^&+=])/,
      "Password must contain at least one special character (@, #, $, %, ^, &, +, =,!)."
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default ResetPasswordSchema;
