import * as Yup from 'yup';

const EventAttendanceSchema = Yup.object().shape({
    isPresent: Yup.string().required('Please select attending status'),
});

export { EventAttendanceSchema };