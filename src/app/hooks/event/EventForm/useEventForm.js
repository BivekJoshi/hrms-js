import { useFormik } from "formik";
import { useAddEvent, useEditEvent } from "../useEvent";
import { EventSchema } from "../Validation/EventSchema";

const useEventForm = (setOpenSubmitModal, handleCloseModal) => {
  const { mutate: addEvent } = useAddEvent({});
  // const { mutate: editEvent } = useEditEvent({});

  const formik = useFormik({
    initialValues: {
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventDescription: '',
      eventLocation: '',
      id: '',
    },
    validationSchema: EventSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = { ...values };
      addEvent(formData, {
        onSuccess: () => {
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
    // editEvent(values, formik);
  };

  return { formik};
};

export default useEventForm;
