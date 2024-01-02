import React from "react";
import AddPromotionHistoryFields from "../../../../../components/Form/PromotionHistory/AddPromotionHistoryFields";
import FormModal from "../../../../../components/Modal/FormModal";
import AddBranchHistoryFields from '../../../../../components/Form/Company/AddBranchHistoryFields';

export const AddBranchHistory = ({ open, handleCloseModal, title, id }) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<AddBranchHistoryFields onClose={handleCloseModal} id={id} />}
      />
    </div>
  );
};