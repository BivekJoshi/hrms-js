import React from 'react';
import FormModal from "../../../components/Modal/FormModal"
import AddProjectFields from "../../../components/Form/Project/AddProjectFields";
import EditProjectFields from '../../../components/Form/Project/EditProjectFields';
import { useGetProjectById } from '../../../hooks/project/useProject';
import { EditProjectDeactivateFields, EditProjectActivateFields } from '../../../components/Form/Project/EditProjectDeactivateFields';


import { AddprojectEmployeeFields, EditProjectEmployeeFields } from '../../../components/Form/Project/projectEmployee/AddProjectEmployeeFields';
import { useGetProjectEmployeeById } from '../../../hooks/project/projectEmployee/useProjectEmployee';



export const AddProjectModal = ({ open, handleCloseModal }) => {
    return (
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


export const AddProjectActiveModal = ({ open, handleCloseModal, id }) => {
    return (
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<EditProjectActivateFields onClose={handleCloseModal} data={id} />}
        />
    )
}

export const DeactivateProjectModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetProjectById(id);
    return (
        <div>
            <FormModal
                open={open}
                onClose={handleCloseModal}
                formComponent={<EditProjectDeactivateFields onClose={handleCloseModal} data={data} />} />
        </div>
    )
}



/*____________________________________________Project Employee Modal_________________________________________________________________*/

export const AddProjectEmployeeModal = ({open, handleCloseModal}) => {
    return(
        <FormModal
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddprojectEmployeeFields onClose={handleCloseModal} />}
        />
    )
}

export const EditProjectEmployeeModal = ({ open, handleCloseModal, id }) => {
    const { data } = useGetProjectEmployeeById(id);
    return (
      <div>
        <FormModal
          open={open}
          onClose={handleCloseModal}
          formComponent={
            <EditProjectEmployeeFields onClose={handleCloseModal} data={data} />
          }
        />
      </div>
    );
  };