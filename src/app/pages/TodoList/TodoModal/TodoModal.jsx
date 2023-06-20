import React from 'react';
import FormModal from '../../../components/Modal/FormModal';

export const AddTodoModal = ({ open, handleCloseModal }) => {
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<AddFromFields onclose= {handleCloseModal} />}
            />
        </div>
    );
};