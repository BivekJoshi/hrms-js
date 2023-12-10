import React from 'react';
import FormModal from "../../../components/Modal/FormModal"
import AddProjectFields from "../../../components/Form/Project/AddProjectFields";
import EditProjectFields from '../../../components/Form/Project/EditProjectFields';
import { useGetProjectById } from '../../../hooks/project/useProject';
import { EditProjectDeactivateFields, EditProjectActivateFields } from '../../../components/Form/Project/EditProjectDeactivateFields';


import { AddprojectEmployeeFields, EditProjectEmployeeFields } from '../../../components/Form/Project/projectEmployee/AddProjectEmployeeFields';
import { useGetProjectEmployeeById } from '../../../hooks/project/projectEmployee/useProjectEmployee';
import ProjectAssignTaskField from '../../../components/Form/Project/ProjectTask/ProjectAssignTaskField';



export const AddProjectModal = ({ open, handleCloseModal, title }) => {
    return (
        <FormModal
        title={title}
            open={open}
            onClose={handleCloseModal}
            formComponent={<AddProjectFields onClose={handleCloseModal} />}
        />
    )
}


export const EditProjectModal = ({ open, handleCloseModal, id, title }) => {
    const { data } = useGetProjectById(id);
    return (
        <div>
            <FormModal
                    title={title}
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

export const DeactivateProjectModal = ({ open, handleCloseModal, id, title }) => {
    const { data } = useGetProjectById(id);
    return (
        <div>
            <FormModal
            title={title}
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

export const EditProjectEmployeeModal = ({ open, handleCloseModal, projectTd }) => {
    const { data } = useGetProjectEmployeeById(projectTd);
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


/*____________________________________________Project Employee Task  Modal_________________________________________________________________*/
export const EditProjectTaskModal = ({ open, handleCloseModal, id ,data}) => {
    return (
      <div>
        <FormModal
          open={open}
          onClose={handleCloseModal}
          formComponent={
            <ProjectAssignTaskField onClose={handleCloseModal} id={id} data={data}/>
          }
        />
      </div>
    );
  };