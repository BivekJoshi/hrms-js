import * as Yup from 'yup';

const LeaveTypeSchema = Yup.object().shape({
    leaveName: Yup.string().required('Leave Type is Required')
        .min(3, 'Leave Name must be at least 3 characters')
        .matches(/^[^0-9]*$/, 'Leave Name cannot contain numbers'),
    leaveTotal: Yup.string().required('Total Leave Days is Required'),
});

export { LeaveTypeSchema };
