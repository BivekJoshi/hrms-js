import * as Yup from "yup";

const CompanySchema = Yup.object().shape({
  branchName: Yup.string()
    .required("Branch name is required")
    .min(3, "Branch name must be at least 3 characters")
    .max(25, "Branch name cannot be greater than 25 characters")
    .matches(/^[^0-9]*$/, "Branch name cannot contain numbers"),
  branchEmail: Yup.string()
    .required("Branch email is required")
    .max(50, "Branch email cannot be greater than 50 characters")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  branchContact: Yup.string()
    .required("Branch contact is required")
    .matches(/^9[0-9]{9}$/, "Invalid mobile number format"),
  branchAddress: Yup.string().required("Branch address is required").max(50, "Branch address cannot be greater than 50 characters"),
  branchDescription: Yup.string().max(255, "Branch description cannot be greater than 255 characters"),
});

export { CompanySchema };
