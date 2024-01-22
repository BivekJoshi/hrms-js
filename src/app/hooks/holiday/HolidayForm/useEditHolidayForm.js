import { useFormik } from "formik";
import { useEditHoliday } from "../useHoliday";
import { HolidaySchema } from "./HolidaySchema";
import { isEqual } from 'lodash';
import { toast } from 'react-toastify';

const useEditHolidayForm = (data, onClose) => {
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
    values = { ...values };
    if (!isEqual(values, formik.initialValues)) {
      mutate(values, {
        onSuccess: () => {
          formik.handleReset()
          onClose();
        },
      });
    } else if (isEqual(values, formik.initialValues)) {
      toast.warning("No changes were made");
      onClose();
    }
  };

  return { formik };
};

export default useEditHolidayForm;
