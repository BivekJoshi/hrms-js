import { useFormik } from "formik";
import { useAddHoliday, useEditHoliday } from "../useHoliday";
import { HolidaySchema } from "./HolidaySchema";

const useHolidayForm = (setOpenSubmitModal, handleCloseModal) => {
  const { mutate: addEvent } = useAddHoliday({});
  // const { mutate: editEvent } = useEditHoliday({});

  const formik = useFormik({
    initialValues: {
      holidayName: "",
      holidayDate: "",
      holidayDescription: "",
      id: "",
    },
    validationSchema: HolidaySchema,
    enableReinitialize: true,
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
        onSuccess: () => {
          formik.resetForm();
          handleCloseModal();
          setOpenSubmitModal(true);
        },
      });
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
      onSuccess: (data) => {},
    });
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editEvent(values, formik);
  };

  return { formik };
};

export default useHolidayForm;
