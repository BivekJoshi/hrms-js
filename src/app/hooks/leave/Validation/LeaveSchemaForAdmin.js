import * as Yup from 'yup';

const LeaveSchemaAdmin = Yup.object().shape({
  // leaveTypeId:Yup.mixed().required("Please Select Leave Name"),
  // fromDate: Yup.string().required('Please Select Date').min(new Date(), 'Leave date cannot be in the past'),
  fromDate: Yup.date().required('Please Select Date').min(new Date(), 'Leave date cannot be in the past'),
  toDate: Yup.date()
  .required('Please Select Date')
  .min(Yup.ref('fromDate'), 'To date cannot be earlier than from date'),
  // toDate: Yup.string().required('Please Select Date'),
  leaveTypeId: Yup.object().required('Please select leave type'),
  employeeId: Yup.object().required('Please select employee name'),
  leaveReason: Yup.string().required('Please select leave reason'),
//   leaveStatus:Yup.string().required("Required")
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
