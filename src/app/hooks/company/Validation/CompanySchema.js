import * as Yup from "yup";

const CompanySchema = Yup.object().shape({
  branchName: Yup.string()
    .required("Branch Name is required")
    .min(3, "Branch name must be at least 3 characters")
    .max(50, "Branch name cannot be greater than 50 characters")
    .matches(
      /^[A-Za-z\s]+$/,
      "Branch name cannot contain numbers or special characters"
    ),
  branchEmail: Yup.string()
    .required("Email is required")
    .max(50, "Email cannot be greater than 50 characters")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  branchContact: Yup.string()
    .required("Contact is required")
    .matches(/^9[0-9]{9}$/, "Invalid mobile number format"),
  branchAddress: Yup.string()
    .required("Address is required")
    .max(50, "Branch address cannot be greater than 50 characters")
    .matches(
      /^[A-Za-z\s]+$/,
      "Branch address cannot contain numbers or special characters"
    ),
  branchDescription: Yup.string().max(
    255,
    "Description cannot be greater than 255 characters"
  ),
});

export { CompanySchema };
