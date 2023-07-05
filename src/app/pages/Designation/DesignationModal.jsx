import React from "react";
import { useGetDesignationById } from "../../hooks/designation/useDesignation";
import EditDesignationfield from "../../components/Form/Designation/EditDesignationFields";
import AddDesignationField from "../../components/Form/Designation/AddDesignationField";
import FormModal from "../../components/Modal/FormModal";

export const AddDesignatioModal = ({ open, handleCloseModal }) => {
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={<AddDesignationField onClose={handleCloseModal} />}
      />
    </div>
  );
};

export const EditDesignationModal = ({ open, handleCloseModal, id }) => {
  const { data } = useGetDesignationById(id);
  return (
    <div>
      <FormModal
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditDesignationfield onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};
