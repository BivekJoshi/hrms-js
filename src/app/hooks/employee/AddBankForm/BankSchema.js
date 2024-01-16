import * as Yup from "yup";

const AddBankSchema = Yup.object().shape({
  bankAccountNumber: Yup.string()
  .required("Bank account number is required")
  .max(20, "Account number cannot be greater than 20 characters")
  .min(12, "Account number must contain atleast 12 characters")
  .matches(/^[0-9a-zA-Z]+$/, "Account number must contain only numbers and/or letters"),
  bankAddress: Yup.string()
    .required("Bank address is required")
    .max(100, "Bank address cannot be greater than 100 characters"),
  bankBranch: Yup.string()
    .required("Bank branch is required")
    .max(50, "Account number cannot be greater than 50 characters"),
  bankName: Yup.string()
    .required("Bank name is required")
    .max(50, "Bank name cannot be greater than 50 characters"),
});

export default AddBankSchema;
