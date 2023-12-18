import * as Yup from "yup";

const CompanySchema = Yup.object().shape({
  branchName: Yup.string()
    .required("Branch Name is Required")
    .min(3, "Branch Name must be at least 3 characters")
    .matches(/^[^0-9]*$/, "Branch Name cannot contain numbers"),
  branchEmail: Yup.string()
    .required("Branch email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  branchContact: Yup.string()
    .required("Branch Contact is required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number format"),
  branchAddress: Yup.string().required("Branch Address is Required"),
});

export { CompanySchema };
