import { useFormik } from 'formik';
import { useAddLeave } from '../useLeave';
import { LeaveSchema } from '../Validation/LeaveSchema';

const useAddLeaveForm = () => {
    const { mutate } = useAddLeave({});

    const formik = useFormik({
        initialValues: {
            employeeId: '',
            leaveTypeId: '',
            leaveReason: '',
            fromDate: '',
            toDate: '',
            applyLeaveDays: '',
            leaveBalance: '',
            leaveStatus: '',
            confirmById: '',
            leaveRemarks: '',
            halfDay: '',
        },
        validationSchema: LeaveSchema,
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

export default useAddLeaveForm;
