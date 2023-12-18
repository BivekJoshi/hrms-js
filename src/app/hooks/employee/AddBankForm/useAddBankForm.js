import { useFormik } from 'formik';
import AddBankSchema from './BankSchema';
import { useAddBank, useEditBank } from '../useBank';

const useAddBankForm = ({ data, employeeLoading: isLoading }) => {
  const bankDetails = !isLoading && data?.bankDetailSet;
  const { mutate } = useAddBank({});
  const { mutate: editMutate } = useEditBank({});

  const formik = useFormik({
    initialValues: {
      id: bankDetails?.id || '',
      bankName: bankDetails?.bankName || '',
      bankAddress: bankDetails?.bankAddress || '',
      bankAccountNumber: bankDetails?.bankAccountNumber || '',
    },
    validationSchema: AddBankSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (bankDetails?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });
  const handleRequest = (values) => {
    values = { ...values };
    mutate(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editMutate(values, formik);
  };
  return { formik };
};

export default useAddBankForm;
