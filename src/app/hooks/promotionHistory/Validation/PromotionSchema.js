import * as Yup from "yup";

const PromotionSchema = Yup.object().shape({
  positionId: Yup.string().required('Position is required'),
  effectiveFromDate: Yup.string().required('Date is required'),
  // remarks: Yup.string().required('Remarks is required'),
});

export { PromotionSchema };
