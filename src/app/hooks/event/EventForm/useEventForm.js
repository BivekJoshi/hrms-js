import { useFormik } from "formik";
import { useAddEvent, useEditEvent } from "../useEvent";
import { EventSchema } from "../Validation/EventSchema";

const useEventForm = (setOpenSubmitModal, handleCloseModal) => {
  const { mutate: addEvent, data } = useAddEvent({});
  const { mutate: editEvent } = useEditEvent({});

  const formik = useFormik({
    initialValues: {
      eventName: data?.eventName || "",
      eventDate: data?.eventDate || "",
      eventTime: data?.eventTime || "",
      eventDescription: data?.eventDescription || "",
      id: data?.id || "",
    },
    validationSchema: EventSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = { ...values };
      addEvent(formData, {
        onSuccess: (data) => {
          formik.resetForm();
          handleCloseModal();
          setOpenSubmitModal(true);
        },
      })
        
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addEvent(values, {
      onSuccess: (data) => {
        
      },
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editEvent(values, formik);
  };

  return { formik ,data};
};

export default useEventForm;
