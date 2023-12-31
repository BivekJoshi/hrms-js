import * as Yup from "yup";

const NewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters long.")
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter."
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one digit (number).")
    .matches(
      /^(?=.*[@#$%^&+=])/,
      "Password must contain at least one special character (@, #, $, %, ^, &, +, =,!)."
    )
    .test(
        "passwords-match",
        "New password must not be the same as old password.",
        function (value) {
          return this.parent.oldPassword !== value;
        }
      )
});

export { NewPasswordSchema };
