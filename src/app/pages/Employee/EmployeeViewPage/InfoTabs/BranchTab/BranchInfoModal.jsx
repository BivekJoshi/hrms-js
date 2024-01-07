import React from "react";
import FormModal from "../../../../../components/Modal/FormModal";
import AddBranchHistoryFields from "../../../../../components/Form/Company/AddBranchHistoryFields";

export const AddBranchHistory = ({
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
          <AddBranchHistoryFields
            onClose={handleCloseModal}
            id={id}
            branchHistoryData={branchHistoryData}
          />
        }
      />
    </div>
  );
};
