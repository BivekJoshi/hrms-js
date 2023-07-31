import { useFormik } from "formik";
import { useAddEvent, useEditEvent } from "../useEvent";
import { EventSchema } from "../Validation/EventSchema";

const useEventForm = (data) => {
  const { mutate: addEvent } = useAddEvent({});
  const { mutate: editEvent } = useEditEvent({});

  const formik = useFormik({
    initialValues: {
      eventName: data?.eventName || "",
      eventDate: data?.eventDate || "",
      eventTime: data?.eventTime || "",
      eventDescription: data?.eventDescription || "",
      id: data?.id,
    },
    // validationSchema: EventSchema,
    enableReinitialize: "true",
    onSubmit: (values) => {
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addEvent(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editEvent(values, formik);
  };

  return { formik };
};

export default useEventForm;
