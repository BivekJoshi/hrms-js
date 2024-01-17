import * as Yup from 'yup';

const EventSchema = Yup.object().shape({
    eventName: Yup.string().required('Event name is required').max(50, "Event name cannot be greater than 50 characters"),
    eventDate: Yup.string().required('Event date is required'),
    eventTime: Yup.string().required('Event time is required'),
    eventDescription: Yup.string().required('Event description is required').max(255, "Event description cannot be greater than 255 characters"),
    eventLocation: Yup.string().required('Event location is required').max(50, "Event location cannot be greater than 50 characters"),
});

export { EventSchema };
