import React from 'react';
import FormModal from "../../../components/Modal/FormModal"
import AddProjectFields from "../../../components/Form/Project/AddProjectFields";
import AddProjectActiveFields from "../../../components/Form/Project/AddProjectActiveFields";
import EditProjectFields from '../../../components/Form/Project/EditProjectFields';
import { useGetDeactivatedProject, useGetProjectById } from '../../../hooks/project/useProject';
import {EditProjectDeactivateFields, EditProjectActivateFields} from '../../../components/Form/Project/EditProjectDeactivateFields';

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


export const AddProjectActiveModal = ({open, handleCloseModal, id}) => {
    return(
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<EditProjectActivateFields onClose={handleCloseModal} data={id} />}
        />
    )
}

export const DeactivateProjectModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetProjectById(id);
    console.log(data)
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<EditProjectDeactivateFields onClose={handleCloseModal} data={data} />} />
        </div>
    )
}