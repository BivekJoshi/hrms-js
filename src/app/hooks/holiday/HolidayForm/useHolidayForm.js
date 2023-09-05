// import { useFormik } from "formik";
// import { useAddHoliday, useEditHoliday } from "../useHoliday";
// import { HolidaySchema } from "./HolidaySchema";

// const useHolidayForm = (data, handleSubmitModal) => {
//   const { mutate: addHoliday } = useAddHoliday({});
//   const { mutate: editHoliday } = useEditHoliday({});

//   const formik = useFormik({
//     initialValues: {
//       holidayName: data?.holidayName || "",
//       holidayDate: data?.holidayDate || "",
//       holidayDescription: data?.holidayDescription || "",
//       id: data?.id,
//     },
//     validationSchema: HolidaySchema,
//     enableReinitialize: "true",
//     onSubmit: (values) => {
//       if (data?.id) {
//         handledEditRequest(values);
//       } else {
//         handleRequest(values);
//       }
//     },
//   });

//   const handleRequest = (values) => {
//     values = { ...values };
//     addHoliday(values, formik);
//     handleSubmitModal();
//   };

//   const handledEditRequest = (values) => {
//     values = { ...values };
//     editHoliday(values, formik);
//   };

//   return { formik };
// };

// export default useHolidayForm;


import { useFormik } from "formik";
import { useAddHoliday, useEditHoliday } from "../useHoliday";
import { HolidaySchema } from "./HolidaySchema";

const useHolidayForm = (setOpenSubmitModal, handleCloseModal) => {
  const { mutate: addEvent, data } = useAddHoliday({});
  const { mutate: editEvent } = useEditHoliday({});

  const formik = useFormik({
    initialValues: {
      holidayName: data?.holidayName || "",
      holidayDate: data?.holidayDate || "",
      holidayDescription: data?.holidayDescription || "",
      id: data?.id,
    },
    validationSchema: HolidaySchema,
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

export default useHolidayForm;

