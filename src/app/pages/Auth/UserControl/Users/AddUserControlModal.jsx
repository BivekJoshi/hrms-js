import React from 'react';
import FormModal from '../../../../components/Modal/FormModal';
import { AddPermissionFields, AddUserControlFields } from './AddUserControlFields';


export const AddUserControlModal = ({ open, handleCloseModal }) => {
    return (
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddUserControlFields onClose={handleCloseModal} />}
        />
    )
}


export const AddUserPermissionModal = ({ open, handleCloseModal }) => {
    return (
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddPermissionFields onClose={handleCloseModal} />}
        />
    )
}