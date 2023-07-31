import * as Yup from 'yup';

const HolidaySchema = Yup.object().shape({
    holidayName: Yup.string().required('Holiday Name is Required'),
});

export { HolidaySchema };
