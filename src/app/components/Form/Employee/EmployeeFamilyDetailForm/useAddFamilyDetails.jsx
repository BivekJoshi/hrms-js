import { useFormik } from 'formik';

const useAddFamilyDetails = (onClose) => {
  const { mutate } = useAddPromotionHistory({});

  const formik = useFormik({
    initialValues: {
      name: '',
      relation: '',
      mobileNumber: '',
    },
    // validationSchema: PositionSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, {
      onSuccess: () => {
        formik.handleReset();
        onClose();
      },
    });
  };

  return { formik };
};

export default useAddFamilyDetails;
