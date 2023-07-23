import { useFormik } from 'formik';
import { useAddEvent } from '../useEvent';
import { EventSchema } from '../Validation/EventSchema';


const useAddEventForm = () => {
    const { mutate, data } = useAddEvent({});

    const formik = useFormik({
        initialValues: {
            eventName: '',
            eventDate: '',
            eventTime: '',
            eventDescription: '',
            eventLocation: '',
        },
        validationSchema: EventSchema,
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
    return { formik, data };
};

export default useAddEventForm;