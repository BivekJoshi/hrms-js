import React from "react";
import FormModal from "../../../../../components/Modal/FormModal";
import AddDepartmentHistoryFields from "../../../../../components/Form/Department/AddDepartmentHistoryFields";

export const AddDepartmentHistory = ({
  open,
  handleCloseModal,
  title,
  id,
  branchHistoryData,
}) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <AddDepartmentHistoryFields
            onClose={handleCloseModal}
            id={id}
            branchHistoryData={branchHistoryData}
          />
        }
      />
    </div>
  );
};
