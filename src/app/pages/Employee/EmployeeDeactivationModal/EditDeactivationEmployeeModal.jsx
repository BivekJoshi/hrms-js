import React from 'react';
import {
  EditEmployeeActivateFields,
  EditEmployeeDeactivateFields,
} from '../../../components/Form/Employee/DeactivateEmployee/EditEmployeeDeactivateFields';
import { useGetEmployeeById } from '../../../hooks/employee/useEmployee';
import FormModal from '../../../components/Modal/FormModal';
import DeactivateUser from '../../../components/Form/Employee/DeactivateUser/DeactivateUser';

export const EditDeactivationEmployeeModal = ({
  open,
  handleCloseModal,
  id,
  title,
}) => {
  const { data } = useGetEmployeeById(id);
  return (
    <div>
      <FormModal
        title={title}
        open={open}
        onClose={handleCloseModal}
        formComponent={
          <EditEmployeeDeactivateFields
            onClose={handleCloseModal}
            data={data}
          />
        }
      />
    </div>
  );
};

export const EditActivationUserModal = ({ open, handleCloseModal, id }) => {
  return (
    <div>
      <FormModal
        title={"Activate user"}
        open={open}
        onClose={handleCloseModal}
        formComponent={<DeactivateUser onClose={handleCloseModal} id={id} />}
      />
    </div>
  );
};
