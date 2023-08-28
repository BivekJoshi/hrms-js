import React from 'react';
import FormModal from '../../../../components/Modal/FormModal';
import { AddUserControlFields } from '../../../../components/Form/User/AddUserControlFields';


export const AddUserControlModal = ({ open, handleCloseModal }) => {
    return (
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddUserControlFields onClose={handleCloseModal} />}
        />
    )
}