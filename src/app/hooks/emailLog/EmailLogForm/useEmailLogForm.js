import { useFormik } from "formik";
import { usePostResendEmail } from "../useEmailLog";

const useEmailResendForm = (passId,emailType) => {
  const { mutate: resendEmail } = usePostResendEmail({passId,emailType});

  const formik = useFormik({
    initialValues: {
        userId :"",
        emailType :""
    },
    // validationSchema: CompanySchema,
    enableReinitialize: true,
    onSubmit: (values) => {
        handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    resendEmail(values, {
      onSuccess: () => {
        formik.resetForm();
      },
    });
  };

  return { formik };
};

export default useEmailResendForm;
