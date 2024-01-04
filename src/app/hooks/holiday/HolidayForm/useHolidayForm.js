import { useFormik } from "formik";
import { useAddHoliday, useEditHoliday } from "../useHoliday";
import { HolidaySchema } from "./HolidaySchema";
import { useState } from "react";

const useHolidayForm = (setOpenSubmitModal, handleCloseModal) => {
  const { mutate: addEvent } = useAddHoliday({});
  // const { mutate: editEvent } = useEditHoliday({});
  const [holidayId, setHolidayId] = useState();

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
      setHolidayId(null);
      addEvent(formData, {
        onSuccess: (data) => {
          formik.resetForm();
          setHolidayId(data.id);
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

  return { formik,holidayId };
};

export default useHolidayForm;
