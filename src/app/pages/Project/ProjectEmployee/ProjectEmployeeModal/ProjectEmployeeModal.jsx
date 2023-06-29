import React from 'react';
import FormModal from "../../../../components/Modal/FormModal";
import AddProjectEmployeeFields from "../../../../components/Form/Project/projectEmployee/AddProjectEmployeeFields";


export const AddProjectEmployeeModal = ({open, handleCloseModal}) => {
    return(
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddProjectEmployeeFields onClose={handleCloseModal} />}
        />
    )
}