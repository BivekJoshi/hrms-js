import { useFormik } from 'formik';
import { useEditLeaveType } from '../useLeaveType';
import { LeaveTypeSchema } from '../Validation/LeaveTypeScheme';

const useEditLeaveTypeForm = (data) => {
    const { mutate } = useEditLeaveType({});

    const formik = useFormik({
        initialValues: {
            leaveName: data?.leaveName || '',
            leaveTotal: data?.leaveTotal || '',
            leaveDescription: data?.leaveDescription || '',
            isCarryForward: data?.isCarryForward || '',
            id: data?.id,
        },
        validationSchema: LeaveTypeSchema,
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

export default useEditLeaveTypeForm;
