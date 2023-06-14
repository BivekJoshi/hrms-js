import { useFormik } from 'formik';
import AddBankSchema from './BankSchema';
import { useAddBank } from '../useBank';

const useAddBankForm = () => {
  const { mutate } = useAddBank({});

  const formik = useFormik({
    initialValues: {
      bankName: '',
      bankAddress: '',
      bankAccountNumber: '',
    },
    validationSchema: AddBankSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  const handleRequest = (values) => {
    values = { ...values };
    mutate(values, formik);
  };
  return { formik };
};

export default useAddBankForm;
