import { useFormik } from "formik";
import { useAddTrainingDetail, useEditTraining } from "../useTraining";
import { TrainingSchema } from "./TrainingSchema";

const useTrainingForm = (data,empId, onClose) => {
  const { mutate: addTraining } = useAddTrainingDetail({});
  const { mutate: editTraining } = useEditTraining({empId});

  const formik = useFormik({
    initialValues: {
      trainingName: data?.trainingName || "",
      trainingLevel: data?.trainingLevel || "",
      trainingInstitute: data?.trainingInstitute || "",
      category: data?.category || "",
      startDate: data?.startDate || "",
      endDate: data?.endDate || "",
      id: data?.id,
    },

    validationSchema: TrainingSchema,
    enableReinitialize: "true",
    onSubmit: (values) => {
      if (data?.id) {
        handledEditRequest(values);
      } else {
        handleRequest(values);
      }
    },
  });

  const handleRequest = (values) => {
    values = { ...values };
    addTraining(values, formik);
  };

  const handledEditRequest = (values) => {
    values = { ...values };
    editTraining(values, formik);
  };
  return { formik };
};

export default useTrainingForm;
