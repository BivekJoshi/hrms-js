import * as React from 'react';

import MaterialTable from '@material-table/core';

import {
  useDeleteDesignation,
  useGetDesignation,
} from '../../hooks/designation/useDesignation';
import { Box, Button, Stack } from '@mui/material';
import DesignationForm from '../../components/Form/Designation/DesignationForm';
import FormModal from '../../components/Modal/FormModal';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import EditDesignationForm from '../../components/Form/Designation/EditDesignationForm';

const Designation = () => {
  const { data: designationData, isLoading } = useGetDesignation();

  const [openModal, setOpenModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [editedDesignation, setEditedDesignation] = React.useState({});

  const handleAddOpenModal = () => setOpenModal(true);
  const handleCloseAddModal = () => setOpenModal(false);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const deleteDesignationMutation = useDeleteDesignation({});
  const handleDeleteDesignation = (designationId) => {
    deleteDesignationMutation.mutate(designationId);
  };

  const handleEditDesignation = (rowData) => {
    setEditedDesignation(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      cellStyle: {
        whiteSpace: 'nowrap',
      },
      width: 80,
    },
    {
      title: 'Designation Name',
      field: 'positionName',
      emptyValue: '-',
      width: 200,
    },
    {
      title: 'Designation Level',
      field: 'positionLevel',
      emptyValue: '-',
      width: 100,
    },
    {
      title: 'Salary',
      field: 'salary',
      emptyValue: '-',
      width: 200,
    },
    {
      title: 'Details',
      field: 'positionDetails',
      emptyValue: '-',
    },
    {
      title: 'Actions',
      render: (rowData) => (
        <Stack direction='row' spacing={0}>
          <Button
            color='primary'
            onClick={() => handleEditDesignation(rowData)}
          >
            <ModeEditOutlineIcon />
          </Button>
          <Button
            color='primary'
            onClick={() => handleDeleteDesignation(rowData.id)}
          >
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
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant='contained'
            sx={{ mt: 3, ml: 1 }}
            onClick={handleAddOpenModal}
          >
            +Add Designation
          </Button>
        </Box>
        <br />
        <br />
      </div>

      <MaterialTable
        columns={columns}
        data={designationData}
        title=''
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

      {openEditModal && (
        <FormModal
          open={openEditModal}
          onClose={handleCloseAddModal}
          formComponent={<EditDesignationForm onClose={handleCloseEditModal} />}
        />
      )}
      {openModal && (
        <FormModal
          open={openModal}
          onClose={handleCloseAddModal}
          formComponent={<DesignationForm onClose={handleCloseAddModal} />}
        />
      )}
    </>
  );
};
export default Designation;
