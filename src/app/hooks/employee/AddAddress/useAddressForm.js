import { useFormik } from 'formik';
import { AddressSchema } from './AddressSchema';
import {
  useEditAddress,
  usePermanentAddAddress,
  useTemporaryAddress,
} from '../useAddress';

export const usePermanentAddressForm = ({
  data,
  employeeLoading: isLoading,
}) => {
  const { mutate: permanentMutate } = usePermanentAddAddress({});
  const { mutate: temporaryMutate } = useTemporaryAddress({});
  const { mutate: editMutate } = useEditAddress({});

  const addressDetails = !isLoading && data?.addresses;

  const mapAddress = (index) => {
    const address = addressDetails[index] || {};
    return {
      addressType: index === 0 ? 'PERMANENT' : 'TEMPORARY',
      id: address.id || '',
      country: address.country || '',
      province: address.province || '',
      district: address.district || '',
      wardNumber: address.wardNumber || '',
      city: address.city || '',
      street: address.street || '',
    };
  };

  const filteredAddresses = [
    mapAddress(0), // Permanent Address
    mapAddress(1), // Temporary Address
  ].filter((address) => address.province !== ''); // Exclude addresses with empty province

  const initialValues = {
    addresses: filteredAddresses,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: AddressSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (data?.addresses.length > 0) {
        handleEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    permanentMutate(values);
    temporaryMutate(values);
  };

  const handleEditRequest = (values) => {
    editMutate(values);
  };

  return { formik };
};
