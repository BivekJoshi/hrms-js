import * as Yup from 'yup';

const AddBankSchema = Yup.object().shape({
  bankAccountNumber: Yup.string().required('Bank account number is required').max(50, "Account number cannot be greater than 50 characters"),
  bankAddress: Yup.string().required('Bank address is required').max(255, "Bank address cannot be greater than 255 characters"),
  // bankBranch: Yup.string().required('Bank branch is required'),

  bankName: Yup.string().required('Bank name is required').max(50, "Bank name cannot be greater than 50 characters"),
});

export default AddBankSchema;
