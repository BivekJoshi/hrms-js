import * as React from 'react';
import MaterialTable from '@material-table/core';
import { useDeleteCompany, useGetCompany } from '../../hooks/company/useCompany';
import { Box, Button, Modal, Stack } from '@mui/material';
import CompanyForm from '../../components/Form/Company/CompanyForm';
import FormModal from '../../components/Modal/FormModal';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useState } from 'react';

const Company = () => {
  const { data: companyData, isLoading } = useGetCompany();

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const deleteCompanyMutation = useDeleteCompany({});

  const [editedCompanyId, setEditedCompanyId] = useState();
  console.log("editedCompanyId", editedCompanyId)

  const handleDeleteCompany = (companyId) => {
    deleteCompanyMutation.mutate(companyId);
  };


  const handleEditCompany = (companyId, formData) => {
    setEditedCompanyId(companyId);
    setOpenModal(true);
    // console.log(companyId);
  };

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id,
      cellStyle: {
        whiteSpace: 'nowrap',
      },
      width: 100,
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
          <Button color="primary" onClick={() => handleEditCompany(rowData.id, rowData)}>
            <ModeEditOutlineIcon />
          </Button>
          <Button color="primary" onClick={() => handleDeleteCompany(rowData.id)}>
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
        <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={handleOpenModal}>
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
        onRowDoubleClick={(_event, rowData) => handleDoubleClickRow(rowData)}
      />
      <FormModal
        open={openModal}
        onClose={handleCloseModal}
        formComponent={<CompanyForm onClose={handleCloseModal} isEditMode={editedCompanyId} companyId={editedCompanyId} />}
      />
    </>
  );
};

export default Company;
