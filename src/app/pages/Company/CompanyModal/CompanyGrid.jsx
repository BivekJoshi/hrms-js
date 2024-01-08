import React, { useEffect, useState } from "react";

import { EditCompanyModal } from "./CompanyModal";
import {
  useDeleteCompany,
  useGetCompany,
} from "../../../hooks/company/useCompany";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import CompanyGridView from "../CompanyView/CompanyGridView";

const CompanyGrid = ({ permissions, companyData, isLoading }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editedCompany, setEditedCompany] = useState({});
  const [deletedCompany, setDeletedCompany] = useState({});

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const {
    deleteCompanyMutation,
    isSuccess: isDeleteSuccess,
  } = useDeleteCompany({});

  useEffect(() => {
    if (isDeleteSuccess) {
      setOpenDeleteModal(false);
    }
  }, [isDeleteSuccess]);

  const handleDeleteCompany = (item) => {
    setDeletedCompany(item);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteCompanyMutation(deletedCompany.id);
  };

  const handleEditCompany = (item) => {
    setEditedCompany(item);
    setOpenEditModal(true);
  };

  return (
    <>
      <CompanyGridView
        permissions={permissions}
        companyData={companyData}
        isLoading={isLoading}
        handleEditCompany={handleEditCompany}
        handleDeleteCompany={handleDeleteCompany}
      />
      {openEditModal && (
        <EditCompanyModal
          title={"Edit Branch"}
          data={editedCompany}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Branch"}
        />
      )}
    </>
  );
};

export default CompanyGrid;
