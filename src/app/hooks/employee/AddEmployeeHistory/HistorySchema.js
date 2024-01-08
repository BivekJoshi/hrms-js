import * as Yup from "yup";

// const HistorySchema = Yup.object().shape({
//     employerName: Yup.string().required('employeer name is Required'),
//     employerAddress: Yup.string().required('Employeer address is required'),
//     pastPosition: Yup.string().required('Past Position is Required'),
//     fromDate: Yup.string().required('From Date is Required'),
//     toDate: Yup.string().required('To Date is required'),
//     description: Yup.string().required('Description is required'),
//     remarks: Yup.string().required('Remark is required'),
// });
const HistorySchema = Yup.object().shape({
  history: Yup.array().of(
    Yup.object().shape({
      employerName: Yup.string()
        .required("Organization name is Required")
        .max(50, "Organization name cannot be greater than 50 characters"),
      employerAddress: Yup.string()
        .required("Organization address is required")
        .max(100, "Organization address cannot be greater than 100 characters"),
      pastPosition: Yup.string()
        .required("Past Position is Required")
        .max(25, "Position name cannot be greater than 25 characters"),
      fromDate: Yup.string().required("From Date is Required"),
      toDate: Yup.string()
        .required("To Date is required")
        .test({
          name: "from-to-date",
          message: "To Date must be greater than or equal to From Date",
          test: function (toDate) {
            const fromDate = this.parent.fromDate; // access the value of fromDate
            return (
              !fromDate || !toDate || new Date(toDate) >= new Date(fromDate)
            );
          },
        }),
      description: Yup.string()
        .max(255, "Description cannot be greater than 255 characters"),
      // remarks: Yup.string().required('Remark is required'),
    })
  ),
});
export default HistorySchema;
