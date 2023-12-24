import { useFormik } from "formik";
import { useEmailConfigure } from '../useEmail';
import { EmailSchema } from './EmailSchema';

const useEmailConfigureForm = (emailData) => {
  const { mutate: emailConfigure } = useEmailConfigure({});

  const formik = useFormik({
    initialValues: {
      sender: emailData?.sender || "",
      host: emailData?.host || "",
      port: emailData?.port || "",
      password: emailData?.password || "",
      signature: emailData?.signature || "",
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