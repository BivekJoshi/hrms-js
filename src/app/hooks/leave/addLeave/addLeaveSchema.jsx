import * as Yup from 'yup';

const addLeaveSchema = Yup.object().shape({
    employeeId: Yup.string().required('Please Select the Employee Name'),
    leaveTypeId: Yup.string().required('Please Select Leave Type'),
    fromDate: Yup.string().required('Please Select Date'),
    leaveStatus: Yup.string().required('Please Select the Leave Status'),
});

export { addLeaveSchema };
