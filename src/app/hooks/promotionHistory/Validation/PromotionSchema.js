import * as Yup from "yup";

const PromotionSchema = Yup.object().shape({
  effectiveFromDate: Yup.string().required(" Effective Date name is required."),
  positionId: Yup.string().required("Position name is required."),

});

export default PromotionSchema;
