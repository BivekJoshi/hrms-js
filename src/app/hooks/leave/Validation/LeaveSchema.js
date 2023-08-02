import * as Yup from 'yup';

const LeaveSchema = Yup.object().shape({
    employeeId: Yup.mixed().required("Employee name is Required"),
    leaveTypeId:Yup.mixed().required("Please Select Leave Name"),
    fromDate: Yup.string().required('Please Select Date'),
    leaveStatus: Yup.string().required('Please Select the Leave Status'),
});

export { LeaveSchema };