import React from 'react';
import FormModal from "../../../../components/Modal/FormModal";
import { AddprojectEmployeeFields, EditProjectEmployeeFields } from "../../../../components/Form/Project/projectEmployee/AddProjectEmployeeFields";
import { useGetProjectEmployee, useGetProjectEmployeeById } from '../../../../hooks/project/projectEmployee/useProjectEmployee';


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