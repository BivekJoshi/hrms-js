import { useFormik } from "formik";
import { useAddPromotionHistory } from "../usePromotionHistory";
import PositionSchema from "../Validation/PromotionSchema";

const useAddPromotionHistoryForm = () => {
  const { mutate } = useAddPromotionHistory({});

  const formik = useFormik({
    initialValues: {
      positionId: "",
      effectiveFromDate: "",
      remarks: "",
    },
    validationSchema: PositionSchema,
    onSubmit: (values) => {
      const isValid = PositionSchema.isValidSync(values); // Simple validation test
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    const positionId = values.positionId ? values.positionId.id : null;
    values = {
      ...values,
      positionId,
    };
    mutate(values, formik, { onSuccess: () => formik.handleReset() });
  };

  return { formik };
};

export default useAddPromotionHistoryForm;
