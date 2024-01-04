import { useFormik } from 'formik';
import AddBankSchema from './BankSchema';
import {
  useAddBank,
  useEditBank,
  useGetBankByEmployeeId,
  useGetBankById,
} from '../useBank';

const useAddBankForm = () => {
  const { data, isLoading } = useGetBankByEmployeeId();
  const bankDetails = !isLoading && data?.[0];
  const { mutate } = useAddBank({});
  const { mutate: editMutate } = useEditBank({});

  const formik = useFormik({
    initialValues: {
      id: bankDetails?.id || '',
      bankName: bankDetails?.bankName || '',
      bankBranch: bankDetails?.bankBranch || '',
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
