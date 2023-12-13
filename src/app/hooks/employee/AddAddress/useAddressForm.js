import { useFormik } from 'formik';
import { AddressSchema } from './AddressSchema';
import {
  useEditAddress,
  usePermanentAddAddress,
  useTemporaryAddress,
} from '../useAddress';
import { toast } from 'react-toastify';

export const usePermanentAddressForm = ({
  data,
  employeeLoading: isLoading,
}) => {
  const { mutate: permanentMutate } = usePermanentAddAddress({});
  const { mutate: temporaryMutate } = useTemporaryAddress({});
  const { mutate: editMutate } = useEditAddress({});

  const addressDetails = !isLoading && data?.addresses;

  const initialValues = {
    addresses: [
      createAddressObject(addressDetails[0]),
      createAddressObject(addressDetails[1], 'TEMPORARY'),
    ],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: AddressSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  function createAddressObject(details, type = 'PERMANENT') {
    return {
      addressType: type,
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
    permanentMutate(values.addresses[0]);
    temporaryMutate(values.addresses[1]);
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

    if (temporary) {
      handleEditMutate(permanent, 'Permanent address edited successfully');
      handleEditMutate(temporary, 'Temporary address edited successfully');
    } else {
      handleEditMutate(permanent, 'Address edited successfully');
    }
  }

  return { formik };
};
