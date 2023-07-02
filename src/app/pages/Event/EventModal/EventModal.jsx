import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import AddEventFields from '../../../components/Form/Event/AddEventFields';

export const AddEventModal = ({ open, handleCloseModal}) => {
    return (
      <div>
        <FormModal 
          open={open}
          onClose={handleCloseModal}
          formComponent={<AddEventFields onClose={handleCloseModal} />}
        />
      </div>
    )
  }