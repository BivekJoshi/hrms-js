import React, { useState } from 'react';

import { EditCompanyModal } from './CompanyModal';
import { useDeleteCompany, useGetCompany } from '../../../hooks/company/useCompany';
import DeleteConfirmationModal from '../../../components/Modal/DeleteConfirmationModal';
import CompanyGridView from '../CompanyView/CompanyGridView';

const CompanyGrid = ({ permissions }) => {
    const { data: companyData, isLoading } = useGetCompany();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [editedCompany, setEditedCompany] = useState({});
    const [deletedCompany, setDeletedCompany] = useState({});

    const handleCloseEditModal = () => setOpenEditModal(false);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const deleteCompanyMutation = useDeleteCompany({});
    const handleDeleteCompany = (item) => {
        setDeletedCompany(item);
        setOpenDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        deleteCompanyMutation.mutate(deletedCompany.id);
        setOpenDeleteModal(false);
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
                    id={editedCompany?.id}
                    open={openEditModal}
                    handleCloseModal={handleCloseEditModal}
                />
            )}
            {openDeleteModal && (
                <DeleteConfirmationModal
                    open={openDeleteModal}
                    handleCloseModal={handleCloseDeleteModal}
                    handleConfirmDelete={handleConfirmDelete}
                    message={'Company'}
                />
            )}
        </>
    );
};

export default CompanyGrid;

