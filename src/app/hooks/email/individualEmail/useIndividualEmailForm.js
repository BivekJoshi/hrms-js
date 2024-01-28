import { useFormik } from "formik";
import { useSendEmail } from "../useEmail";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
});

const useIndividualEmailForm = (employeeId, onClose) => {
  const { mutate } = useSendEmail({employeeId});

  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
    },
    validationSchema: validateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    mutate(values, {
      onSuccess: () => {
        onClose();
        formik.resetForm();
      },
    });
  };

  return { formik };
};

export default useIndividualEmailForm;
