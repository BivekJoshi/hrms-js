import * as Yup from "yup";

const HistorySchema = Yup.object().shape({
  pastPosition: Yup.string().required("Employee Position is required"),
  fromDate: Yup.string().required("From Date is required"),
  toDate: Yup.string().required("To Date is required"),
  description: Yup.string().required("Work Description is required"),
  remarks: Yup.string().required("Remarks is required"),
  employerName: Yup.string().required("Branch Name is required"),
  employerAddress: Yup.string().required("Branch Address is required"),
});

export { HistorySchema };
