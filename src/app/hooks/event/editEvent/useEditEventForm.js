import { useFormik } from 'formik';
import { useEditEvent } from '../useEvent';
import { EventSchema } from '../Validation/EventSchema';

const useEditEventForm = (data, onClose) => {
  const { mutate } = useEditEvent({});

  const formik = useFormik({
    initialValues: {
      eventName: data?.eventName || '',
      eventDate: data?.eventDate || '',
      eventTime: data?.eventTime || '',
      eventDescription: data?.eventDescription || '',
      eventLocation: data?.eventLocation || '',
      id: data?.id,
    },
    validationSchema: EventSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });
  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, {
      onSuccess: () => {
        onClose();
        formik.handleReset();
      },
    });
  };

  return { formik };
};

export default useEditEventForm;
