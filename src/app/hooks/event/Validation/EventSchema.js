import * as Yup from 'yup';

const EventSchema = Yup.object().shape({
    eventName: Yup.string().required('Event Name is Required'),
});

export { EventSchema };
