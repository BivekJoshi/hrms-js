import React from 'react'
import AddPromotionHistoryFields from "../../../../../components/Form/PromotionHistory/AddPromotionHistoryFields"
import FormModal from "../../../../../components/Modal/FormModal"

export const AddPromotionHistory = ({ open, handleCloseModal}) => {
    return (
      <div>
        <FormModal
          open={open}
          onClose={handleCloseModal}
          formComponent={<AddPromotionHistoryFields onClose={handleCloseModal} />}
        />
      </div>
    )
  }