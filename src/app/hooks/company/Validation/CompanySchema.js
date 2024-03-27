import * as Yup from "yup";

const CompanySchema = Yup.object().shape({
  branchName: Yup.string()
    .required("Branch Name is required")
    .min(3, "Branch Name must be at least 3 characters")
    .max(50, "Branch Name cannot be greater than 50 characters")
    .matches(
      /^[A-Za-z\s]+$/,
      "Branch Name cannot contain numbers or special characters"
    ),
  branchEmail: Yup.string()
    .required("Email is required")
    .max(50, "Email cannot be greater than 50 characters")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  branchContact: Yup.string()
    // .required("Contact is required")
    .matches(/^[0-9]+$/, "Invalid phone number")
    .min(10, "Contact must be 10 digits")
    .max(10, "Contact must be 10 digits")
    .matches(/^98[0-9]{8}$/, "Invalid phone number"),
  branchTelephone: Yup.string()
    .matches(/^[0-9-]+$/,"Invalid telephone number")
    .max(10, "Telephone number must be at most 10 digits"),
  branchAddress: Yup.string()
    .required("Branch Address is required")
    .max(50, "Branch Address cannot be greater than 50 characters")
    .matches(
      /^[^0-9!@#$%^&*()_+={}\[\]:;<>.?~\\/]*$/,
      "Branch Address cannot contain numbers or special characters"
    ),

  branchDescription: Yup.string().max(
    255,
    "Description cannot be greater than 255 characters"
  ),
});

export { CompanySchema };
