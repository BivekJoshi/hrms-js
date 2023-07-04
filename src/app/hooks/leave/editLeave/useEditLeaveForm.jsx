import { useFormik } from 'formik';
import { useEditLeave } from '../useLeave';
import { LeaveSchema } from '../Validation/LeaveSchema';

const useEditLeaveForm = (data) => {
    const { mutate } = useEditLeave({});

    const formik = useFormik({
        initialValues: {
            employeeId: data?.employeeId || '',
            leaveTypeId: data?.leaveTypeId || '',
            leaveReason: data?.leaveReason || '',
            fromDate: data?.fromDate || '',
            toDate: data?.toDate || '',
            applyLeaveDays: data?.applyLeaveDays || '',
            leaveBalance: data?.leaveBalance || '',
            leaveStatus: data?.leaveStatus || '',
            confirmById: data?.confirmById || '',
            leaveRemarks: data?.leaveRemarks || '',
            halfDay: data?.halfDay || '',
            id: data?.id,
        },
        validationSchema: LeaveSchema,
        enableReinitialize: 'true',
        onSubmit: (values) => {
            handleRequest(values);
        },
    });

    const handleRequest = (values) => {
        values = {
            ...values,
        };
        mutate(values, formik);
    };

    return { formik };
};

export default useEditLeaveForm;
