import * as Yup from 'yup';

const EventAttendanceSchema = Yup.object().shape({
    isPresent: Yup.string().required('Event status is required'),
});

export { EventAttendanceSchema };