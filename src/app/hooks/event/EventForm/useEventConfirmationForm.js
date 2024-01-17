import { useFormik } from "formik";
import { useAddEventConfirmaation } from "../useEvent";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  remarks: Yup.string().required("Remarks is Required"),
});

const useEventConfirmationForm = (data) => {
  const { mutate: addEventConfirmation } = useAddEventConfirmaation({});

  const formik = useFormik({
    initialValues: {
      eventId: "",
      notificationId: "",
      status: "",
      remarks: "",
    },

    // validationSchema: validateSchema,
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
