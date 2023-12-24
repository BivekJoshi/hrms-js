import { useFormik } from 'formik';
import { useActivateUser } from '../employee/DeactivateEmploye/useEmployee';

export const useDeactiveUser = (onClose, id) => {
  const { mutate } = useActivateUser({});
  const formik = useFormik({
    initialValues: {
      userId: id || '',
    },
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return { formik };
};
