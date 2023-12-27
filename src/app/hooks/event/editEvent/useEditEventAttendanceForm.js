import { useFormik } from "formik";
import { useEditEventAttendance } from "../useEvent";
import { EventAttendanceSchema } from '../Validation/EventAttendanceSchema';

const useEditEventAttendanceForm = (data, onClose) => {
  const { mutate } = useEditEventAttendance({});

  const formik = useFormik({
    initialValues: {
      // eventName: data?.eventName || "",
      // eventDate: data?.eventDate || "",
      // eventTime: data?.eventTime || "",
      // eventDescription: data?.eventDescription || "",
      // eventLocation: data?.eventLocation || "",
      isPresent: data?.isPresent || "",
      notificationId: data?.notificationId || "",
      id: data?.eventId,
    },
    validationSchema: EventAttendanceSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, { onSuccess: () => {
      onClose();
      formik.resetForm();
    } });
  };

  return { formik };
};

export default useEditEventAttendanceForm;
