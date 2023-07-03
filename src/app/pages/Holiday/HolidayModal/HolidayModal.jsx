import React from 'react'
import FormModal from '../../../components/Modal/FormModal';
import AddHolidayFields from '../../../components/Form/Holiday/AddHolidayFields';

export const AddHolidayModal = ({ open, handleCloseModal}) => {
    return (
      <div>
        <FormModal 
          open={open}
          onClose={handleCloseModal}
          formComponent={<AddHolidayFields onClose={handleCloseModal} />}
        />
      </div>
    )
  }