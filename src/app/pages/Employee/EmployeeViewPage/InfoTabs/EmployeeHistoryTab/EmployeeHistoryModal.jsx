import React from "react";
import AddEmployeeHistoryFields from '../../../../../components/Form/EmployeeHistory/AddEmployeeHistoryFields';
import FormModal from '../../../../../components/Modal/FormModal';

export const AddEmployeeHistory = ({ open, handleCloseModal, title }) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={<AddEmployeeHistoryFields onClose={handleCloseModal} />}
      />
    </div>
  );
};