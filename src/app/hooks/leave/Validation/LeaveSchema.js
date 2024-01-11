import * as Yup from 'yup';

const LeaveSchema = Yup.object().shape({
  // leaveTypeId:Yup.mixed().required("Please Select Leave Name"),
  fromDate: Yup.date().required('Please Select Date').min(new Date(), 'Leave date cannot be in the past'),
  toDate: Yup.date()
  .required('Please Select Date')
  .min(Yup.ref('fromDate'), 'To date cannot be earlier than from date'),
  leaveTypeId: Yup.object().required('Please select leave type'),
  employeeId: Yup.string().required('Please select employee name'),
  leaveReason: Yup.string().required('Please provide a reason').max(255, 'Leave reason cannot be greater than 255 characters'),
  leaveStatus:Yup.string().required("Required")
});

export { LeaveSchema };

const EditLeaveSchema = Yup.object().shape({
  // leaveStatus: Yup.mixed()
  // .test('isValidStatus', 'Leave Status must be one of the following values: APPROVED, REJECTED', value => {
  //   return value === 'APPROVED' || value === 'REJECTED';
  // })
  // .required('You need to either approve or reject this leave.'),
  leaveStatus: Yup.string().required(
    'You need to either approve or reject this leave.'
  ),
});

export { EditLeaveSchema };
