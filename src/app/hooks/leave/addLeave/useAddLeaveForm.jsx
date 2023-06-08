import { useFormik } from 'formik';
import { addLeaveSchema } from './addLeaveSchema';
import { useAddLeave } from '../useLeave';

const useAddLeaveTypeForm = () => {
    const { mutate } = useAddLeave({});

    const formik = useFormik({
        initialValues: {
            employeeId: '',
            leaveTypeId: '',
            leaveReason: '',
            fromDate: '',
            employeeId: '',
            leaveTypeId: '',
            leaveReason: '',
            fromDate: '',
        },
        validationSchema: addLeaveSchema,
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

export default useAddLeaveTypeForm;
