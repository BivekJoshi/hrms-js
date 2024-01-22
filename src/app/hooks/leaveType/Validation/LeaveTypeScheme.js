import * as Yup from 'yup';

const LeaveTypeSchema = Yup.object().shape({
    leaveName: Yup.string().required('Please select leave type')
        .min(3, 'Leave type must be at least 3 characters')
        .matches(/^[^0-9]*$/, 'Leave type cannot contain numbers'),
    leaveTotal: Yup.number().required('Total leave days is required').min(1, 'Leave must be at least one day').max(30, 'Leave cannot be greater than 30 days'),
});

export { LeaveTypeSchema };
