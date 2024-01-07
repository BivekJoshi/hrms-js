import { useFormik } from "formik";
import { useAddEvent, useEditEvent } from "../useEvent";
import { EventSchema } from "../Validation/EventSchema";
import { useState } from "react";
 
const useEventForm = (setOpenSubmitModal, handleCloseModal) => {
  const { mutate: addEvent } = useAddEvent({});
  const [eventId, setEventId] = useState();
  // const { mutate: editEvent } = useEditEvent({});
 
  const formik = useFormik({
    initialValues: {
      eventName: "",
      eventDate: "",
      eventTime: "",
      eventDescription: "",
      eventLocation: "",
      id: "",
    },
    validationSchema: EventSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
      // const formData = { ...values };
      // addEvent(formData, {
      //   onSuccess: () => {
      //     formik.resetForm();
      //     handleCloseModal();
      //     setOpenSubmitModal(true);
      //   },
      // })
    },
  });
 
  const handleRequest = (values) => {
    values = { ...values };
    setEventId(null);
    addEvent(values, {
      onSuccess: (data) => {
        formik.resetForm();
        setEventId(data?.id);
        handleCloseModal();
        setOpenSubmitModal(true);
      },
    });
  };
 
  // const handledEditRequest = (values) => {
  //   values = { ...values };
  //   // editEvent(values, formik);
  // };
 
  return { formik,eventId };
};
 
export default useEventForm;