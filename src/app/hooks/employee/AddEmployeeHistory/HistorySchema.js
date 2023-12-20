import * as Yup from "yup";

const HistorySchema = Yup.object().shape({
  history: Yup.array().of(
    Yup.object().shape({
      employerName: Yup.string().required("employeer name is Required"),
      employerAddress: Yup.string().required("Employeer address is required"),
      pastPosition: Yup.string().required("Past Position is Required"),
      fromDate: Yup.string().required("From Date is Required"),
      toDate: Yup.string().required("To Date is required"),
      description: Yup.string().required("Description is required"),
      remarks: Yup.string().required("Remark is required"),
    })
  ),
});

export default HistorySchema;
