import React from 'react';
import FormModal from '../../../../components/Modal/FormModal';
import { AddRoleFields } from './AddRoleFields';


export const AddRoleModal = ({ open, handleCloseModal }) => {
    return (
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddRoleFields onClose={handleCloseModal} />}
        />
    )
}