import React from "react";
import FormModal from "../../../../components/Modal/FormModal";
import { AddUserControlFields } from "../../../../components/Form/User/AddUserControlFields";
import { EditUserControlFieldsRole } from "../../../../components/Form/User/EditUserControlFieldsRole";

export const AddUserControlModal = ({ open, handleCloseModal, title, userControlData }) => {
  return (
    <FormModal
      title={title}
      open={open}
      onClose={handleCloseModal}
      formComponent={<AddUserControlFields onClose={handleCloseModal} userControlData={userControlData}/>}
    />
  );
};

export const EditUserControlModal = ({
  open,
  handleCloseModal,
  rowData,
  title,
}) => {
  return (
    <FormModal
      title={title}
      open={open}
      onClose={handleCloseModal}
      formComponent={
        <EditUserControlFieldsRole
          onClose={handleCloseModal}
          rowData={rowData}
        />
      }
    />
  );
};
