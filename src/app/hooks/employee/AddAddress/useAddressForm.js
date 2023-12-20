import { useFormik } from 'formik';
import { AddressSchema } from './AddressSchema';
import {
  useEditAddress,
  usePermanentAddAddress,
  useTemporaryAddress,
} from '../useAddress';
import { toast } from 'react-toastify';

export const usePermanentAddressForm = (data, isLoading) => {
  const { mutate: permanentMutate } = usePermanentAddAddress({});
  const { mutate: temporaryMutate } = useTemporaryAddress({});
  const { mutate: editMutate } = useEditAddress({});

  const addressDetails = !isLoading && data;

  const initialValues = {
    addresses: [
      {
        addressType: 'PERMANENT',
        id: addressDetails[0]?.id || null,
        country: addressDetails[0]?.country || '',
        province: addressDetails[0]?.province || '',
        district: addressDetails[0]?.district || '',
        wardNumber: addressDetails[0]?.wardNumber || '',
        city: addressDetails[0]?.city || '',
        street: addressDetails[0]?.street || '',
      },
      {
        addressType: 'TEMPORARY',
        id: addressDetails[1]?.id || null,
        country: addressDetails[1]?.country || '',
        province: addressDetails[1]?.province || '',
        district: addressDetails[1]?.district || '',
        wardNumber: addressDetails[1]?.wardNumber || '',
        city: addressDetails[1]?.city || '',
        street: addressDetails[1]?.street || '',
      },
    ],

    perTempAddSame:
      addressDetails?.length > 0 ? !addressDetails?.[0]?.perTempAddSame : false,
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
      id: details?.id || null,
      country: details?.country || '',
      province: details?.province || '',
      district: details?.district || '',
      wardNumber: details?.wardNumber || '',
      city: details?.city || '',
      street: details?.street || '',
      perTempAddSame: details?.perTempAddSame,
    };
  }

  function handleSubmit(values) {
    const hasAddresses = addressDetails ? addressDetails?.length > 0 : '';
    if (hasAddresses) {
      handleEditRequest(values);
    } else {
      handleRequest(values);
    }
  }

  function handleRequest(values) {
    const { addresses } = values;

    addresses[0].addressType = 'PERMANENT';
    addresses[1].addressType = 'TEMPORARY';

    const permanentAddress = {
      ...addresses[0],
      perTempAddSame: !formik?.values?.perTempAddSame,
    };

    const temporary = {
      ...addresses[1],
      perTempAddSame: !formik?.values?.perTempAddSame,
    };
    const finalAddress = [permanentAddress, temporary];
    console.log(formik.values?.perTempAddSame);
    if (!formik.values?.perTempAddSame) {
      permanentMutate([finalAddress?.[0]]);
    } else permanentMutate(finalAddress);

    // if (tempAddressIsEmpty) {
    //   // If temporary address is empty, only update the permanent address
    //   permanentMutate([{ ...addressDetails?.[0] }]);
    // } else {
    //   // If temporary address is not empty, update both permanent and temporary addresses
    //   permanentMutate(addressDetails);
    // }
  }

  function handleEditRequest(values) {
    const { addresses } = values;
    const permanentAddress = {
      ...addresses[0],
      perTempAddSame: !formik?.values?.perTempAddSame,
      addressType: 'PERMANENT',
    };

    const temporary = {
      ...addresses[1],
      perTempAddSame: !formik?.values?.perTempAddSame,
      addressType: 'TEMPORARY',
    };
    const finalAddress = [permanentAddress, temporary];
    console.log(formik.values?.perTempAddSame);
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
    if (!formik.values?.perTempAddSame) {
      handleEditMutate([finalAddress?.[0]], 'Address edited successfully');
    } else handleEditMutate(finalAddress, 'Address edited successfully');
  }

  return { formik };
};
