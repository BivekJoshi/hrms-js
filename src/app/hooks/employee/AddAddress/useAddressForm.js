import { useFormik } from 'formik';
import { AddressSchema } from './AddressSchema';
import { useEditAddress, usePermanentAddAddress } from '../useAddress';

export const usePermanentAddressForm = ({
  data,
  employeeLoading: isLoading,
}) => {
  const { mutate: permanentMutate } = usePermanentAddAddress({});
  const { mutate: editMutate } = useEditAddress({});
  const addressDetails = !isLoading && data?.addresses;
  const formik = useFormik({
    initialValues: {
      addresses: [
        {
          id: addressDetails[0]?.id || '',
          country: addressDetails[0]?.country || '',
          province: addressDetails[0]?.province || '',
          district: addressDetails[0]?.district || '',
          wardNumber: addressDetails[0]?.wardNumber || '',
          city: addressDetails[0]?.city || '',
          street: addressDetails[0]?.street || '',
        },
        {
          id: addressDetails[1]?.id || '',
          country: addressDetails[1]?.country || '',
          province: addressDetails[1]?.province || '',
          district: addressDetails[1]?.district || '',
          wardNumber: addressDetails[1]?.wardNumber || '',
          city: addressDetails[1]?.city || '',
          street: addressDetails[1]?.street || '',
        },
      ],
    },
    validationSchema: AddressSchema,
    enableReinitialize: 'true',
    onSubmit: (values) => {
      if (data?.addresses.length > 0) {
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
