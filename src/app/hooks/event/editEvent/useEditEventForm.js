import { useFormik } from 'formik';
import { useEditEvent } from '../useEvent';
import { EventSchema } from '../Validation/EventSchema';
import { isEqual } from 'lodash';
import { toast } from 'react-toastify';

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
    values = { ...values };
    if (!isEqual(values, formik.initialValues)) {
      mutate(values, {
        onSuccess: () => {
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

export default useEditEventForm;
