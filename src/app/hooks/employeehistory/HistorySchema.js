import * as Yup from 'yup';

const HistorySchema = Yup.object().shape({
  pastPosition: Yup.string().required('Employee Position is required').max(50, 'Position name cannot be greater than 50  characters'),
  fromDate: Yup.string().required('From Date is required'),
  toDate: Yup.string().required('To Date is required'),
  // description: Yup.string().required("Work Description is required"),
  // remarks: Yup.string().required("Remarks is required"),
  employerName: Yup.string().required('Branch Name is required').max(50, 'Branch name cannot be greater than 50  characters'),
  employerAddress: Yup.string().required('Branch Address is required').max(100, 'Branch address cannot be greater than 100  characters'),
});

export { HistorySchema };
