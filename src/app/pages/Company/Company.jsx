import * as React from 'react';
import { useState } from 'react';
import MaterialTable from '@material-table/core';
import { Box, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useDeleteCompany, useGetCompany } from '../../hooks/company/useCompany';
import { AddCompanyModal, EditCompanyModal } from './CompanyModal/CompanyModal';
import DeleteConfirmationModal from '../../components/Modal/DeleteConfirmationModal';

const Company = () => {
  const { data: companyData, isLoading } = useGetCompany();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // State to control the delete confirmation modal

  const [editedCompany, setEditedCompany] = useState({});
  const [deletedCompany, setDeletedCompany] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteCompanyMutation = useDeleteCompany({});
  const handleDeleteCompany = (rowData) => {
    setDeletedCompany(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteCompanyMutation.mutate(deletedCompany.id);
    setOpenDeleteModal(false);
  };

  const handleEditCompany = (rowData) => {
    setEditedCompany(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.index + 1,
      width: 80,
      sortable: false,
    },
    {
      title: 'Company Name',
      field: 'companyName',
      emptyValue: '-',
      width: 300,
    },
    {
      title: 'Company Type',
      field: 'companyType',
      emptyValue: '-',
      width: 340,
    },
    {
      title: 'Description',
      field: 'companyDescription',
      emptyValue: '-',
    },
    {
      title: 'Actions',
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button color="primary" onClick={() => handleEditCompany(rowData)}>
            <EditIcon />
          </Button>
          <Button color="primary" onClick={() => handleDeleteCompany(rowData)}>
            <DeleteIcon />
          </Button>
        </Stack>
      ),
      sorting: false,
      width: 120,
    },
  ];

  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={handleAddOpenModal}>
          +Add Company
        </Button>
      </Box>
      <br />
      <br />
      <MaterialTable
        columns={columns}
        data={companyData}
        title=""
        isLoading={isLoading}
        options={{
          padding: 'dense',
          margin: 50,
          pageSize: 12,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: '#1c7ed6',
            color: '#FFF',
            fontSize: 20,
            padding: 'dense',
            height: 50,
          },
          rowStyle: {
            fontSize: 18,
          },
        }}
      />
      {openEditModal && (
        <EditCompanyModal
          id={editedCompany?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openAddModal && (
        <AddCompanyModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Company"}
        />
      )}
    </>
  );
};

export default Company;