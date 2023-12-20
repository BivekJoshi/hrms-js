import { useFormik } from "formik";
import { useEmailConfigure } from '../useEmail';
import { EmailSchema } from './EmailSchema';

const useEmailConfigureForm = () => {
  const { mutate: emailConfigure } = useEmailConfigure({});

  const formik = useFormik({
    initialValues: {
      sender: "",
      host: "",
      port: "",
      password: "",
      signature: "",
    },
    validationSchema: EmailSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
        handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    emailConfigure(values, {
      onSuccess: () => {
        formik.resetForm();
      },
    });
  };

  return { formik };
};

export default useEmailConfigureForm;