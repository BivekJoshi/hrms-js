import { useFormik } from "formik";
import { useAddHoliday, useEditHoliday } from "../useHoliday";
import { HolidaySchema } from "./HolidaySchema";

const useHolidayForm = (data, handleSubmitModal) => {
  const { mutate: addHoliday } = useAddHoliday({});
  const { mutate: editHoliday } = useEditHoliday({});

  const formik = useFormik({
    initialValues: {
      holidayName: data?.holidayName || "",
      holidayDate: data?.holidayDate || "",
      holidayDescription: data?.holidayDescription || "",
      id: data?.id,
    },
    validationSchema: HolidaySchema,
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
    addHoliday(values, formik);
    handleSubmitModal();
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editHoliday(values, formik);
  };

  return { formik };
};

export default useHolidayForm;
