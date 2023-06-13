import { useFormik } from 'formik';
import { AddressSchema } from './AddressSchema';
import {
  useGetAddressById,
  usePermanentAddAddress,
  useTemporaryAddress,
} from '../useAddress';
import { useParams } from 'react-router-dom';

export const usePermanentAddressForm = () => {
  const { id } = useParams();
  const { mutate: permanentMutate } = usePermanentAddAddress({});
  const { data, isLoading } = useGetAddressById(id);
  console.log(data);

  const formik = useFormik({
    initialValues: {
      district: '',
      wardNumber: '',
      city: '',
      street: '',
      province: '',
      country: '',
      temporaryAndPermanentAddressSame: '',
    },
    validationSchema: AddressSchema,
    onSubmit: (values) => {
      console.log(values);
      handleRequest(values);
    },
  });
  const handleRequest = (values) => {
    console.log('request', values);
    values = { ...values };
    permanentMutate(values);
  };
  return { formik };
};

export const useTemporaryAddressForm = () => {
  const { mutate: temporaryMutate } = useTemporaryAddress({});
  const formik = useFormik({
    initialValues: {
      district: '',
      wardNumber: '',
      city: '',
      street: '',
      province: '',
      country: '',
    },
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  const handleRequest = (values) => {
    values = { ...values };
    temporaryMutate(values);
  };
  return { formik };
};
