import { useFormik } from "formik";
import { useSendEmailToAll } from "../useEmail";

const useEmailForm = (eventId) => {
  const { mutate } = useSendEmailToAll({});

  const formik = useFormik({
    initialValues: {
      employeeIds: "",
      eventId: eventId,
    },
    // validationSchema: CompanySchema,

    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    mutate(values, formik);
  };

  return { formik };
};

export default useEmailForm;
