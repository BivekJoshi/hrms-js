import React from 'react';
import FormModal from '../../../Modal/FormModal';
import EditDocumentFields from './EditDocumentFields';
import { useGetDocumentByFileId } from '../../../../hooks/employee/useDocument';


export const EditDocumentModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetDocumentByFileId(id)
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<EditDocumentFields onClose={handleCloseModal} data={data} />} />
        </div>
    )
}