import { useFormik } from 'formik';
import { useAddfamilyMember } from '../../../../hooks/employee/useFamily';

const useAddFamilyDetails = (onClose) => {
  const { mutate } = useAddfamilyMember({});

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
