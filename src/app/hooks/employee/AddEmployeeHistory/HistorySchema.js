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
        .required("Organization Name is required")
        .max(50, "Organization Name cannot be greater than 50 characters")
        .min(3, "Organaization Name cannot be less than 3 characheter"),
      employerAddress: Yup.string()
        .required("Organization Address is required")
        .max(100, "Organization Address cannot be greater than 100 characters"),
      pastPosition: Yup.string()
        .required("Past Position is required")
        .max(25, "Position Name cannot be greater than 25 characters")
        .min(3, "Position Name cannot be less than 3 characheter"),
      fromDate: Yup.string().required("From Date is required"),
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
      description: Yup.string().max(
        255,
        "Description cannot be greater than 255 characters"
      ),
      // remarks: Yup.string().required('Remark is required'),
    })
  ),
});
export default HistorySchema;
