import * as Yup from 'yup';

const AddBankSchema = Yup.object().shape({
  bankAccountNumber: Yup.string().required('Bank account number is required'),
  bankAddress: Yup.string().required('Bank address is required'),
  bankName: Yup.string().required('Bank name is required'),
});

export default AddBankSchema;
