import React from "react";
import TrainingField from "../../../../../components/Form/Training/TrainingField";
import FormModal from "../../../../../components/Modal/FormModal";
import { useGetTrainingById } from "../../../../../hooks/training/useTraining";

export const AddTrainingInfo = ({ open, handleCloseModal }) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<TrainingField onClose={handleCloseModal} />}
      />
    </div>
  );
};

export const EditTrainingInfo = ({ open, handleCloseModal, id,empId }) => {
  const { data } = useGetTrainingById(id);
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<TrainingField onClose={handleCloseModal} data={data} empId={empId}/>}
      />
    </div>
  );
};
