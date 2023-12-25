import * as Yup from "yup";

const LeaveSchema = Yup.object().shape({
    // leaveTypeId:Yup.mixed().required("Please Select Leave Name"),
    fromDate: Yup.string().required('Please Select Date'),
    // leaveStatus:Yup.string().required("Required")
});

export { LeaveSchema };

const EditLeaveSchema = Yup.object().shape({
    leaveStatus: Yup.mixed()
    .test('isValidStatus', 'Leave Status must be one of the following values: APPROVED, REJECTED', value => {
      return value === 'APPROVED' || value === 'REJECTED';
    })
    .required('You need to either approve or reject this leave.'),
});

export { EditLeaveSchema };
