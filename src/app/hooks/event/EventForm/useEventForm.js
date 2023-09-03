import { useFormik } from "formik";
import { useAddEvent, useEditEvent } from "../useEvent";
import { EventSchema } from "../Validation/EventSchema";

const useEventForm = (setOpenSubmitModal, handleCloseModal) => {
  const { mutate: addEvent, data } = useAddEvent({});
  console.log(data,"data hai ma ");
  const { mutate: editEvent } = useEditEvent({});

  const formik = useFormik({
    initialValues: {
      eventName: data?.eventName || "",
      eventDate: data?.eventDate || "",
      eventTime: data?.eventTime || "",
      eventDescription: data?.eventDescription || "",
      id: data?.id,
    },
    validationSchema: EventSchema,
    enableReinitialize: "true",
    // onSubmit: (values) => {
    //   if (data?.id) {
    //     handledEditRequest(values);
    //     // handleOpenSubmitModal();
    //   } else {
    //     handleRequest(values);
    //     handleOpenSubmitModal();
    //     formik.resetForm();
    //   }
    // },
    onSubmit: (values) => {
      const formData = { ...values };
      addEvent(formData, {
        onSuccess: (data) => {
          handleCloseModal();
          formik.resetForm();
        },
      }),
        setOpenSubmitModal(true);
    },
  });
  //   onSubmit: (values) => {
  //     handleRequest(values);
  //     setOpenSubmitModal(true);
  //     formik.resetForm();
  //   },
  // });

  const handleRequest = (values) => {
    values = { ...values };
    addEvent(values, {
      onSuccess: (data) => {
        console.log("pk");
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
