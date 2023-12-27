import * as Yup from 'yup';

const EventSchema = Yup.object().shape({
    eventName: Yup.string().required('Event name is required'),
    eventDate: Yup.string().required('Event date is required'),
    eventTime: Yup.string().required('Event time is required'),
    eventDescription: Yup.string().required('Event description is required'),
    eventLocation: Yup.string().required('Event location is required'),
});

export { EventSchema };
