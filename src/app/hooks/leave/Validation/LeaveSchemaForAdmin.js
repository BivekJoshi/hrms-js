import * as Yup from 'yup';

const LeaveSchemaAdmin = Yup.object().shape({
  fromDate: Yup.date().required('Please select date'),
  toDate: Yup.date()
  .required('Please select date')
  .min(Yup.ref('fromDate'), 'To date cannot be earlier than from date'),
  leaveTypeId: Yup.object().required('Please select leave type'),
  employeeId: Yup.mixed().nullable().required('Please select employee name'),
  leaveReason: Yup.string().required(' Leave Reason is required '),
  leavePeriod:Yup.string().required("Please select leave period")
});

export { LeaveSchemaAdmin };

const EditLeaveSchemaAdmin = Yup.object().shape({
  // leaveStatus: Yup.mixed()
  // .test('isValidStatus', 'Leave Status must be one of the following values: APPROVED, REJECTED', value => {
  //   return value === 'APPROVED' || value === 'REJECTED';
  // })
  // .required('You need to either approve or reject this leave.'),
  leaveStatus: Yup.string().required(
    'You need to either approve or reject this leave.'
  ),
});

export { EditLeaveSchemaAdmin };
