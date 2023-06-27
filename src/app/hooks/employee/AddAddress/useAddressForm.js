import { useFormik } from 'formik';
import { AddressSchema } from './AddressSchema';
import {
  useEditAddress,
  useGetAddressById,
  usePermanentAddAddress,
  useTemporaryAddress,
} from '../useAddress';

export const usePermanentAddressForm = ({
  data,
  employeeLoading: isLoading,
}) => {
  const { mutate: permanentMutate } = usePermanentAddAddress({});
  const { mutate: editMutate } = useEditAddress({});
  const addressDetails =
    !isLoading &&
    data?.addresses.map((address) => ({
      id: address?.id || '',
      country: address?.country || '',
      province: address?.province || '',
      district: address?.district || '',
      wardNumber: address?.wardNumber || '',
      city: address?.city || '',
      street: address?.street || '',
    }));
  console.log(data);
  const formik = useFormik({
    initialValues: {
      addresses:
        addressDetails && addressDetails.length > 0
          ? addressDetails
          : [
              {
                country: '',
                province: '',
                district: '',
                wardNumber: '',
                city: '',
                street: '',
              },
              {
                country: '',
                province: '',
                district: '',
                wardNumber: '',
                city: '',
                street: '',
              },
            ],
    },
    // validationSchema: AddressSchema,
    enableReinitialize: 'true',
    onSubmit: (values) => {
      if (addressDetails.length > 0) {
        handleEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });
  const handleRequest = (values) => {
    values = { ...values };
    permanentMutate(values);
  };

  const handleEditRequest = (values) => {
    values = { ...values };
    editMutate(values);
  };
  return { formik };
};
