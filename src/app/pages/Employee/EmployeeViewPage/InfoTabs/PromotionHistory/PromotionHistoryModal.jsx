import React from "react";
import AddPromotionHistoryFields from "../../../../../components/Form/PromotionHistory/AddPromotionHistoryFields";
import FormModal from "../../../../../components/Modal/FormModal";

export const AddPromotionHistory = ({
  open,
  handleCloseModal,
  title,
  PromotionHistory,
}) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <AddPromotionHistoryFields
            onClose={handleCloseModal}
            PromotionHistory={PromotionHistory}
          />
        }
      />
    </div>
  );
};
