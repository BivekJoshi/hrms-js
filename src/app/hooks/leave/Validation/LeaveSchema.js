import * as Yup from 'yup';

const LeaveSchema = Yup.object().shape({
  fromDate: Yup.date().required('Please select date'),
  toDate: Yup.date()
  .required('Please select date')
  .min(Yup.ref('fromDate'), 'To date cannot be earlier than from date'),
  leaveTypeId: Yup.object().nullable().required('Please select leave type'),
  employeeId: Yup.string().required('Please select employee name'),
  leaveReason: Yup.string().required(' Leave Reason is required').max(255, 'Leave Reason cannot be greater than 255 characters'),
  leaveStatus:Yup.string().required("Status is required"),
  leavePeriod:Yup.string().required("Leave Period is required"),
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
  leaveReason: Yup.string().required('Leave reason is required'),
});

export { EditLeaveSchema };
