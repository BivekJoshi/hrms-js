import * as Yup from "yup";

const PositionSchema = Yup.object().shape({
  positionId: Yup.object().nullable().required("Position name is required."),
  effectiveFromDate: Yup.string().required(" Effective Date name is required."),
  // remarks: Yup.string().required(" Remarks is required."),
});

export default PositionSchema;
