import * as Yup from 'yup';

const LeaveSchema = Yup.object().shape({
    // leaveTypeId:Yup.mixed().required("Please Select Leave Name"),
    fromDate: Yup.string().required('Please Select Date'),
});

export { LeaveSchema };