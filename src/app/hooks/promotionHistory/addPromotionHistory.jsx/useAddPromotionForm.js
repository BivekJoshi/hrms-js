import { useFormik } from "formik";
import { PromotionSchema } from "../Validation/PromotionSchema";
import { useAddPromotionHistory } from "../usePromotionHistory";

const useAddPromotionHistoryForm = (onClose) => {
  const { mutate } = useAddPromotionHistory({});

  const formik = useFormik({
    initialValues: {
      positionId: '',
      effectiveFromDate: '',
      remarks: '',
    },
    validationSchema: PromotionSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleRequest(values);
    },
  });

  const handleRequest = (values) => {
    values = {
      ...values,
    };
    mutate(values, {
      onSuccess: () => {
        onClose();
        // formik.resetForm();
      },
    });
  };

  return { formik };
};

export default useAddPromotionHistoryForm;
