import { useFormik } from 'formik';
import {
  useAddOfficeResource,
  useEditOfficeResource,
  useEditActiveInactiveOfficeResource,
} from '../useOfficeResource';
import { OfficeResourceSchema } from './OfficeResourceSchema';

const useOfficeResourceForm = (data, onClose) => {
  const { mutate: addOfficeResource } = useAddOfficeResource({});
  const { mutate: editOfficeResource } = useEditOfficeResource({});
  // const { mutate: editDeactivatedOfficeResource } = useEditActiveInactiveOfficeResource({});

  const handleSubmit = (values) => {
    values = { ...values };
    if (data?.id) {
      handleEditAndDeactivate(values);
    } else {
      handleAdd(values);
    }
  };

  const handleAdd = (values) => {
    addOfficeResource(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleEditAndDeactivate = (values) => {
    editOfficeResource(values, {
      onSuccess: () => {
        onClose();
      },
    });
    // editDeactivatedOfficeResource(values, formik);
  };

  const formik = useFormik({
    initialValues: {
      name: data?.name || '',
      uniqueNumber: data?.uniqueNumber || '',
      description: data?.description || '',
      id: data?.id || '',
      isActive: data?.isActive || false,
    },
    validationSchema: OfficeResourceSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  return { formik };
};

export default useOfficeResourceForm;
