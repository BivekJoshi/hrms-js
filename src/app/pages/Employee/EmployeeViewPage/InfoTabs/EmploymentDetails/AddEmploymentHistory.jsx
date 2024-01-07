import React from 'react';
import FormModal from '../../../../../components/Modal/FormModal';
import AddEmploymentHistoryFields from '../../../../../components/Form/EmploymentHistory/AddEmploymentHistoryFields';

export const AddEmploymentHistory = ({ open, handleCloseModal, title }) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <AddEmploymentHistoryFields onClose={handleCloseModal} />
        }
      />
    </div>
  );
};
