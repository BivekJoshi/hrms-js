import { useFormik } from 'formik';
import { AddressSchema } from './AddressSchema';
import {
  useGetAddressById,
  usePermanentAddAddress,
  useTemporaryAddress,
} from '../useAddress';
import { useParams } from 'react-router-dom';

export const usePermanentAddressForm = ({
  data,
  employeeLoading: isLoading,
}) => {
  const { mutate: permanentMutate } = usePermanentAddAddress({});
  const addressDetails = !isLoading && data?.addresses[0];
  console.log(addressDetails?.district);
  const formik = useFormik({
    initialValues: {
      addresses: [
        {
          country: addressDetails?.country || '',
          province: addressDetails?.province || '',
          district: addressDetails?.district || '',
          wardNumber: addressDetails?.wardNumber || '',
          city: addressDetails?.city || '',
          street: addressDetails?.street || '',
          temporaryAndPermanentAddressSame:
            addressDetails?.temporaryAndPermanentAddressSame,
        },
      ],
    },
    // validationSchema: AddressSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
    enableReinitialize: 'true',
  });
  console.log(formik);
  const handleRequest = (values) => {
    values = { ...values };
    permanentMutate(values);
  };
  return { formik };
};

export const useTemporaryAddressForm = () => {
  const { mutate: temporaryMutate } = useTemporaryAddress({});
  const formik = useFormik({
    initialValues: {
      addresses: [
        {
          district: '',
          wardNumber: '',
          city: '',
          street: '',
          province: '',
          country: '',
        },
      ],
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
