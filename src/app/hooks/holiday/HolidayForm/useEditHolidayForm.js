import { useFormik } from "formik";
import { useEditHoliday } from "../useHoliday";
import { HolidaySchema } from "./HolidaySchema";

const useEditHolidayForm = (data) => {
  const { mutate } = useEditHoliday({});

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
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, formik, { onSuccess: () => formik.handleReset() });
  };

  return { formik };
};

export default useEditHolidayForm;
