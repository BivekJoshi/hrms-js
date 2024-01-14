import { useFormik } from 'formik';
import { useAddDesignation, useEditDesignation } from '../useDesignation';
import { DesignationSchema } from '../Validation/DesignationSchema';
import { isEqual } from 'lodash';

const useDesignationForm = (data, onClose) => {
  const { mutate: addDesignation } = useAddDesignation({});
  const { mutate: editDesignation } = useEditDesignation({});

  const formik = useFormik({
    initialValues: {
      positionName: data?.positionName || '',
      positionLevel: data?.positionLevel || '',
      salary: data?.salary || '',
      positionDetails: data?.positionDetails || '',
      id: data?.id,
    },
    validationSchema: DesignationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addDesignation(values, {
      onSuccess: () => {
        onClose();
        formik.resetForm();
      },
    });
  };

  // const handledEditRequest = (values) => {
  //   values = { ...values };
  //   editDesignation(values, {
  //     onSuccess: () => {
  //       onClose();
  //     },
  //   });
  // };

  const handledEditRequest = (values) => {
    values = { ...values };
    if (!isEqual(values, formik.initialValues)) {
      editDesignation(values, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return { formik };
};

export default useDesignationForm;
