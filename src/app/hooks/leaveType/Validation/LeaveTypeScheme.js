import * as Yup from 'yup';

const LeaveTypeSchema = Yup.object().shape({
    leaveName: Yup.string().required('Leave Name is Required')
        .min(3, 'Leave Name must be at least 3 characters')
        .matches(/^[^0-9]*$/, 'Leave Name cannot contain numbers'),
    leaveTotal: Yup.string().required('Leave Total is Required'),
});

export { LeaveTypeSchema };
