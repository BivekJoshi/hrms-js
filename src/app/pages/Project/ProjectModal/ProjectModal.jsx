import React from 'react';
import FormModal from "../../../components/Modal/FormModal"
import AddProjectFields from "../../../components/Form/Project/AddProjectFields";

export const AddProjectModal = ({open, handleCloseModal}) => {
    return(
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddProjectFields onClose={handleCloseModal} />}
        />
    )
}

export const EditProjectModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetProjectById(id);
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<EditProjectFields onClose={handleCloseModal} data={data} />} />
        </div>
    )
}