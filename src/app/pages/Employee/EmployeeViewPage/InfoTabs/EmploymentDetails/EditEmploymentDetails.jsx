import React from "react";
import FormModal from "../../../../../components/Modal/FormModal";
import EmployeeEditFields from "../../../../../components/Form/EmploymentHistory/EmployeeEditDetails";

const EditEmploymentDetails = ({ open, handleClose, tableId ,rowData}) => {
  return (
    <div>
      <FormModal
        title={"Edit Employment Details"}
        open={open}
        onClose={handleClose}
        formComponent={
          <EmployeeEditFields tableId={tableId} onClose={handleClose} rowData={rowData}/>
        }
      />
    </div>
  );
};

export default EditEmploymentDetails;
