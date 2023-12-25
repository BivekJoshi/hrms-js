import { useFormik } from "formik";
import { useAddEventConfirmaation } from "../useEvent";

const useEventConfirmationForm = (data) => {
  const { mutate: addEventConfirmation } = useAddEventConfirmaation({});

  const formik = useFormik({
    initialValues: {
      eventId: "",
      notificationId: "",
      status: "",
    },

    enableReinitialize: true,

    onSubmit: (values) => {
      const formData = { ...values };
      addEventConfirmation(formData, {
        onSuccess: () => {
          formik.resetForm();
        },
      });
    },
  });
  return { formik };
};

export default useEventConfirmationForm;
