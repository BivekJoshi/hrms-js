import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import { useGetDesignationById } from "../../../hooks/designation/useDesignation";
import DesignationFields from "../../../components/Form/Designation/DesignationFields";

export const AddDesignationModal = ({ open, handleCloseModal, title }) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<DesignationFields onClose={handleCloseModal} />}
      />
    </div>
  );
};

export const EditDesignationModal = ({ open, handleCloseModal, id, title }) => {
  const { data } = useGetDesignationById(id);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <DesignationFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};
