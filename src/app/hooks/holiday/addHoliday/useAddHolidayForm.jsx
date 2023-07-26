import { useFormik } from 'formik';
import { useAddHoliday } from '../useHoliday';
import { HolidaySchema } from '../Validation/HolidaySchema';


const useAddHolidayForm = () => {
    const { mutate, data } = useAddHoliday({});

    const formik = useFormik({
        initialValues: {
            holidayName: '',
            holidayDate: '',
            holidayDescription: '',
        },
        validationSchema: HolidaySchema,
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

export default useAddHolidayForm;