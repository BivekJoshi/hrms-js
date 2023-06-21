import { useFormik } from 'formik';
import { useAddLeaveType } from '../useLeaveType';
import { LeaveTypeSchema } from '../Validation/LeaveTypeScheme';

const useEditLeaveTypeForm = (data) => {
    const { mutate } = useAddLeaveType({});

    const formik = useFormik({
        initialValues: {
            leaveName: data?.leaveName || '',
            leaveTotal: data?.LeaveTotal || '',
            leaveDescription: data?.leaveDescription || '',
            carryForward: data?.carryForward || '',
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
