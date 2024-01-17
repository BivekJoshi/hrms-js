import * as Yup from 'yup';

const EventSchema = Yup.object().shape({
    eventName: Yup.string().required('Event name is required').max(50, "Event name cannot be greater than 50 characters"),
    eventDate: Yup.string().required('Please select Event date'),
    eventTime: Yup.string().required('Please select Event time'),
    eventDescription: Yup.string().required('Event Description is required').max(255, "Event description cannot be greater than 255 characters"),
    eventLocation: Yup.string().required('Event Location is required').max(50, "Event location cannot be greater than 50 characters"),
});

export { EventSchema };
