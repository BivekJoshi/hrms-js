import React from "react";
import FormModal from "../../../../components/Modal/FormModal";
import { AddRoleFields } from "./AddRoleFields";
import { useRoleForm } from "../../../../hooks/auth/roles/RoleForm/useRoleForm";
import { useGetRoleByID } from "../../../../hooks/auth/roles/useRole";
import RolePermissionField from "./RolePermissionField";

export const AddRoleModal = ({ open, handleCloseModal }) => {
  return (
    <FormModal
      open={open}
      onClose={handleCloseModal}
      formComponent={<AddRoleFields onClose={handleCloseModal} />}
    />
  );
};

export const EditRoleModal = ({ open, handleCloseModal, id }) => {
  const { data } = useGetRoleByID(id);
  return (
    <FormModal
      open={open}
      onClose={handleCloseModal}
      formComponent={<AddRoleFields onClose={handleCloseModal} data={data} />}
    />
  );
};

export const EditPermissionRoleModal = ({ open, handleCloseModal, id }) => {
  const { data } = useGetRoleByID(id);
  return (
    <FormModal
      open={open}
      onClose={handleCloseModal}
      formComponent={<RolePermissionField onClose={handleCloseModal} data={data} />}
    />
  );
};
