import React, { useEffect, useState } from "react";
import CompanyTableView from "../CompanyView/CompanyTableView";
import { EditCompanyModal } from "./CompanyModal";
import {
  useDeleteCompany,
  useGetCompany,
} from "../../../hooks/company/useCompany";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";

const CompanyTable = ({ permissions, companyData, isLoading }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editedCompany, setEditedCompany] = useState({});
  const [deletedCompany, setDeletedCompany] = useState({});

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const {deleteCompanyMutation,isSuccess:isDeleteSuccess} = useDeleteCompany({});
  const handleDeleteCompany = (rowData) => {
    setDeletedCompany(rowData);
    setOpenDeleteModal(true);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setOpenDeleteModal(false);
    }
  }, [isDeleteSuccess]);

  const handleConfirmDelete = () => {
    deleteCompanyMutation(deletedCompany.id);
  };

  const handleEditCompany = (rowData) => {
    setEditedCompany(rowData);
    setOpenEditModal(true);
  };


  return (
    <>
      <CompanyTableView
        permissions={permissions}
        companyData={companyData}
        isLoading={isLoading}
        handleEditCompany={handleEditCompany}
        handleDeleteCompany={handleDeleteCompany}
      />
      {openEditModal && (
        <EditCompanyModal
          title={"Edit Branch"}
          // id={editedCompany?.id}
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

export default CompanyTable;
