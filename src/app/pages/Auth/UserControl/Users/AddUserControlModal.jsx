import React from 'react';
import FormModal from '../../../../components/Modal/FormModal';
import { AddUserControlFields } from '../../../../components/Form/User/AddUserControlFields';
import { EditUserControlFieldsRole } from '../../../../components/Form/User/EditUserControlFieldsRole';


export const AddUserControlModal = ({ open, handleCloseModal, title }) => {
    return (
        <FormModal
        title={title}
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddUserControlFields onClose={handleCloseModal} />}
        />
    )
}

export const EditUserControlModal = ({ open, handleCloseModal,rowData }) => {
    return (
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<EditUserControlFieldsRole onClose={handleCloseModal} rowData={rowData}/>}
        />
    )
}