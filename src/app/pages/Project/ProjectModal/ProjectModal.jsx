import React from "react";
import FormModal from "../../../components/Modal/FormModal";
import AddProjectFields from "../../../components/Form/Project/AddProjectFields";
import EditProjectFields from "../../../components/Form/Project/EditProjectFields";
import { useGetProjectById } from "../../../hooks/project/useProject";
import {
  EditProjectDeactivateFields,
  EditProjectActivateFields,
} from "../../../components/Form/Project/EditProjectDeactivateFields";

import {
  AddprojectEmployeeFields,
  EditProjectEmployeeFields,
} from "../../../components/Form/Project/projectEmployee/AddProjectEmployeeFields";
import { useGetProjectEmployeeById } from "../../../hooks/project/projectEmployee/useProjectEmployee";
import ProjectAssignTaskField from "../../../components/Form/Project/ProjectTask/ProjectAssignTaskField";
import ProjectTaskField from "../../../components/Form/Project/ProjectTask/ProjectTaskFields";

export const AddProjectModal = ({ open, handleCloseModal, title }) => {
  return (
    <FormModal
      title={title}
      open={open}
      onClose={handleCloseModal}
      formComponent={<AddProjectFields onClose={handleCloseModal} />}
    />
  );
};

export const EditProjectModal = ({ open, handleCloseModal, data, title }) => {
  // const { data } = useGetProjectById(id);
 
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditProjectFields onClose={handleCloseModal} data={data} />
        }
      />
    </div>
  );
};

export const AddProjectActiveModal = ({
  open,
  handleCloseModal,
  id,
  title,
}) => {
  return (
    <FormModal
      title={"Activate Project"}
      open={open}
      onClose={handleCloseModal}
      width={370}
      formComponent={
        <EditProjectActivateFields onClose={handleCloseModal} data={id} />
      }
    />
  );
};

export const DeactivateProjectModal = ({
  open,
  handleCloseModal,
  id,
  title,
}) => {
  const { data: terminateProject } = useGetProjectById(id);

  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditProjectDeactivateFields
            onClose={handleCloseModal}
            data={terminateProject}
          />
        }
      />
    </div>
  );
};

/*____________________________________________Project Employee Modal_________________________________________________________________*/

export const AddProjectEmployeeModal = ({
  open,
  handleCloseAddModal,
  title,
}) => {
  return (
    <FormModal
      title={title}
      open={open}
      onClose={handleCloseAddModal}
      formComponent={<AddprojectEmployeeFields onClose={handleCloseAddModal} />}
    />
  );
};

export const EditProjectEmployeeModal = ({
  open,
  handleCloseEditModal,
  data,
  title,
}) => {
  // const { data } = useGetProjectEmployeeById(projectTd);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseEditModal}
        formComponent={
          <EditProjectEmployeeFields
            onClose={handleCloseEditModal}
            data={data}
          />
        }
      />
    </div>
  );
};

// Open of Project Task Modal  add edit assign task to employee

/*____________________________________________Project Employee Task  Modal_________________________________________________________________*/
export const AddProjectTaskModal = ({
  open,
  handleCloseModal,
  id,
  data,
  title,
}) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <ProjectTaskField onClose={handleCloseModal} id={id} data={data} />
        }
      />
    </div>
  );
};

/*____________________________________________Project Employee Task  Modal_________________________________________________________________*/
export const EditProjectTaskModal = ({
  open,
  handleCloseModal,
  id,
  data,
  title,
}) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <ProjectTaskField onClose={handleCloseModal} id={id} data={data} />
        }
      />
    </div>
  );
};

/*____________________________________________Project Employee Task  Modal_________________________________________________________________*/
export const AssignProjectTaskModal = ({
  open,
  handleCloseModal,
  id,
  data,
  title,
}) => {
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <ProjectAssignTaskField
            onClose={handleCloseModal}
            id={id}
            data={data}
          />
        }
      />
    </div>
  );
};
