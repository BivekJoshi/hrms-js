import React from "react";
import FormModal from "../../../../components/Modal/FormModal";
import { AddRoleFields } from "./AddRoleFields";
import { useRoleForm } from "../../../../hooks/auth/roles/RoleForm/useRoleForm";
import { useGetRoleByID } from "../../../../hooks/auth/roles/useRole";

export const AddRoleModal = ({ open, handleCloseModal, title }) => {
  return (
    <FormModal
      open={open}
      title={title}
      onClose={handleCloseModal}
      formComponent={<AddRoleFields onClose={handleCloseModal} />}
    />
  );
};

export const EditRoleModal = ({ open, handleCloseModal, id, title }) => {
  const { data } = useGetRoleByID(id);
  return (
    <FormModal
      open={open}
      onClose={handleCloseModal}
      title={title}
      formComponent={<AddRoleFields onClose={handleCloseModal} data={data} />}
    />
  );
};
