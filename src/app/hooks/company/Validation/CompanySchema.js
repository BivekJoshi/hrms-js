import * as Yup from "yup";

const CompanySchema = Yup.object().shape({
  branchName: Yup.string()
    .required("Branch name is required")
    .min(3, "Branch name must be at least 3 characters")
    .matches(/^[^0-9]*$/, "Branch name cannot contain numbers"),
  branchEmail: Yup.string()
    .required("Branch email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  branchContact: Yup.string()
    .required("Branch contact is required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number format"),
  branchAddress: Yup.string().required("Branch address is required"),
  branchDescription: Yup.string().required("Branch description address is required"),
});

export { CompanySchema };
