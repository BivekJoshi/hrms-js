import * as Yup from "yup";

const AddBankSchema = Yup.object().shape({
  bankAccountNumber: Yup.string()
  .required("Bank Account Number is required")
  .max(20, "Account Number cannot be greater than 20 characters")
  .min(12, "Account Number must contain atleast 12 characters")
  .matches(/^[0-9a-zA-Z]+$/, "Account Number must contain only numbers and/or letters"),
  bankAddress: Yup.string()
    .required("Bank Address is required")
    .max(100, "Bank Address cannot be greater than 100 characters"),
  bankBranch: Yup.string()
    .required("Bank Branch is required")
    .max(50, "Account Number cannot be greater than 50 characters"),
  bankName: Yup.string()
    .required("Bank Name is required")
    .max(50, "Bank Name cannot be greater than 50 characters"),
});

export default AddBankSchema;
