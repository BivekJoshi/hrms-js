import { useFormik } from 'formik';
import { useAddEvent } from '../useEvent';
import { EventSchema } from '../Validation/EventSchema';


const useAddEventForm = () => {
    const { mutate } = useAddEvent({});

    const formik = useFormik({
        initialValues: {
            eventName: '',
            eventDate: '',
            eventTime: '',
            eventDescription: '',
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

    return { formik };
};

export default useAddEventForm;