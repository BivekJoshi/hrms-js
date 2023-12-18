import { useFormik } from 'formik';
import { AddressSchema } from './AddressSchema';
import {
  useEditAddress,
  useGetAddressById,
  usePermanentAddAddress,
  useTemporaryAddress,
} from '../useAddress';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export const usePermanentAddressForm = (isLoading, data) => {
  const { mutate: permanentMutate } = usePermanentAddAddress({});
  const { mutate: temporaryMutate } = useTemporaryAddress({});
  const { mutate: editMutate } = useEditAddress({});

  const addressDetails = !isLoading && data;

  const initialValues = {
    addresses: [
      createAddressObject(addressDetails[0]),
      createAddressObject(addressDetails[1]),
    ],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: AddressSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  function createAddressObject(details) {
    return {
      addressType: details?.addressType,
      id: details?.id || '',
      country: details?.country || '',
      province: details?.province || '',
      district: details?.district || '',
      wardNumber: details?.wardNumber || '',
      city: details?.city || '',
      street: details?.street || '',
    };
  }

  function handleSubmit(values) {
    const hasAddresses = addressDetails?.length > 0;

    if (hasAddresses) {
      handleEditRequest(values);
    } else {
      handleRequest(values);
    }
  }

  function handleRequest(values) {
    const { addresses } = values;

    // Check if the temporary address is empty (province is empty)
    if (addresses[1]?.province === '') {
      // If temporary address is empty, only update the permanent address
      permanentMutate({ ...addresses[0], addressType: 'PERMANENT' });
    } else {
      // If temporary address is not empty, update both permanent and temporary addresses
      permanentMutate({
        ...addresses[0],
        addressType: 'PERMANENT',
      });

      temporaryMutate({
        ...addresses[1],
        addressType: 'TEMPORARY',
      });
    }
  }

  function handleEditRequest(values) {
    const [permanent, temporary] = values.addresses;

    const handleEditMutate = (address, onSuccessMessage) => {
      editMutate(address, {
        onSuccess: () => {
          toast.success(onSuccessMessage);
        },
        onError: (err) => {
          toast.error(err);
        },
      });
    };

    if (temporary?.addressType) {
      handleEditMutate(permanent, 'Permanent address edited successfully');
      handleEditMutate(temporary, 'Temporary address edited successfully');
    } else {
      handleEditMutate(permanent, 'Address edited successfully');
    }
  }

  return { formik };
};
