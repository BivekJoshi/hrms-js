import React from 'react';
import FormModal from "../../../components/Modal/FormModal"
import AddProjectFields from "../../../components/Form/Project/AddProjectFields";
import AddProjectActiveFields from "../../../components/Form/Project/AddProjectActiveFields";
import EditProjectFields from '../../../components/Form/Project/EditProjectFields';
import { useGetProjectById } from '../../../hooks/project/useProject';

export const AddProjectModal = ({open, handleCloseModal}) => {
    return(
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddProjectFields onClose={handleCloseModal} />}
        />
    )
}

export const AddProjectActiveModal = ({open, handleCloseModal, id}) => {
    const { data } = useGetProjectById(id)
    return(
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddProjectActiveFields onClose={handleCloseModal} data={data} />}
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