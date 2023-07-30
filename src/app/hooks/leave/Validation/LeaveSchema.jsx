import * as Yup from 'yup';

const LeaveSchema = Yup.object().shape({
    fromDate: Yup.string().required('Please Select Date'),
    leaveStatus: Yup.string().required('Please Select the Leave Status'),
});

export { LeaveSchema };