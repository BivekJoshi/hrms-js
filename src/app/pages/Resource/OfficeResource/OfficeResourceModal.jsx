import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import OfficeResourceFields from '../../../components/Form/Resource/OfficeResource/OfficeResourceFields';

export const AddOfficeResourceModal = ({ open, handleCloseModal}) => {
  return (
    <div>
      <FormModal 
        open={open}
        onClose={handleCloseModal}
        formComponent={<OfficeResourceFields onClose={handleCloseModal} />}
      />
    </div>
  )
}

