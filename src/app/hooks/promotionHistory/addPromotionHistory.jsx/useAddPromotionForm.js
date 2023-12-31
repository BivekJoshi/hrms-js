import { useFormik } from "formik";
import PromotionSchema from "../Validation/PromotionSchema";
import { useAddPromotionHistory } from "../usePromotionHistory";

const useAddPromotionHistoryForm = () => {
  const { mutate } = useAddPromotionHistory({});

  const formik = useFormik({
    initialValues: {
      positionId: "",
      effectiveFromDate: "",
      remarks: "",
    },
    validationSchema: PromotionSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, formik, { onSuccess: () => formik.handleReset() });
  };

  return { formik };
};

export default useAddPromotionHistoryForm;
