import { useFormik } from "formik";
import { useAddPromotionHistory } from "../usePromotionHistory";
import PositionSchema from "../Validation/PromotionSchema";

const useAddPromotionHistoryForm = (onClose) => {
  const { mutate } = useAddPromotionHistory({});

  const formik = useFormik({
    initialValues: {
      positionId: "",
      effectiveFromDate: "",
      remarks: "",
    },
    validationSchema: PositionSchema,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    const positionId = values.positionId ? values.positionId.id : null;
    values = {
      ...values,
      positionId,
    };
    mutate(values, {
      onSuccess: () => {
        formik.handleReset();
        onClose();
      },
    });
  };

  return { formik };
};

export default useAddPromotionHistoryForm;
