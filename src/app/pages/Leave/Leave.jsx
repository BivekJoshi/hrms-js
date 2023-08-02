import * as React from 'react';
import { useState } from 'react';
import MaterialTable from '@material-table/core';
import { Box, Button, Chip, Stack } from '@mui/material';
import { useGetLeaveType } from '../../hooks/leaveType/useLeaveType';

import { useDeleteLeave, useGetLeave } from '../../hooks/leave/useLeave';
import { useGetEmployee } from '../../hooks/employee/useEmployee';


import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { AddLeaveModal, EditLeaveModal } from './LeaveModal/LeaveModal';
import DeleteConfirmationModal from '../../components/Modal/DeleteConfirmationModal';

const Leave = ({ isLoading }) => {
  const { data: leaveData, isLoading: loadingleave } = useGetLeave();
  const { data: employeeData, isLoading: loadingemployee } = useGetEmployee();
  const { data: leaveTypeData, isLoading: loadingleaveType } = useGetLeaveType();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedLeave, setEditedLeave] = useState({});
  const [deletedLeave, setDeletedLeave] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteLeaveMutation = useDeleteLeave({});
  const handleDeleteLeave = (rowData) => {
    setDeletedLeave(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteLeaveMutation.mutate(deletedLeave.id);
    setOpenDeleteModal(false);
  };

  const handleEditLeave = (rowData) => {
    setEditedLeave(rowData);
    setOpenEditModal(true);
  };

  const getEmployeeName = (rowData) => {
    const employeeId = rowData.employeeId;
    const employee = employeeData?.find((emp) => emp.id === employeeId);
    const name = `${employee?.firstName} ${employee?.middleName || ''} ${employee?.lastName}`;
    return name;
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const getLeaveTypeName = (rowData) => {
    const leaveTypeId = rowData.leaveTypeId;
    const leaveType = leaveTypeData.find((leave) => leave.id === leaveTypeId);
    const name = `${capitalizeFirstLetter(leaveType.leaveName)} Leave`;
    return name;
  };
  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.index + 1,
      width: 80,
      sortable: false,
    },
    {
      title: 'Employee Name',
      render: (rowData) => {
        return <p>{getEmployeeName(rowData)} </p>
      },
      width: 120,
    },
    {
      title: 'Leave Type',
      render: (rowData) => {
        return <p>{getLeaveTypeName(rowData)}</p>;
      },
      width: 150,
    },
    {
      title: 'From',
      field: 'fromDate',
      emptyValue: '-',
      width: 100,
    },
    {
      title: 'To',
      field: 'toDate',
      emptyValue: '-',
      width: 100,
    },
    {
      title: 'Status',
      field: 'leaveStatus',
      emptyValue: '-',
      width: 100,
      cellStyle: {
        whiteSpace: 'nowrap',
      },
      render: (rowData) => {
        const status = rowData.leaveStatus;
        let chipColor = "";

        if (status === "APPROVED") {
          chipColor = "green";
        } else if (status === "REJECTED") {
          chipColor = "red";
        } else if (status === "PENDING") {
          chipColor = "orange";
        }

        return (
          <Chip label={status} style={{ backgroundColor: chipColor, color: "white", width: ' 9rem' }} />
        );
      },

    },
    {
      title: 'Remark',
      field: 'leaveRemarks',
      emptyValue: '-',
      width: 100,
    },
    {
      title: 'Approved By',
      field: 'confirmById',
      emptyValue: '-',
      width: 40,
    },
    {
      title: 'Actions',
      render: (rowData) => {
        const isApprovedOrRejected = ['APPROVED', 'REJECTED'].includes(rowData.leaveStatus);
    
        return (
          <Stack direction="row" spacing={0}>
            <Button
              color="primary"
              onClick={() => handleEditLeave(rowData)}
              disabled={isApprovedOrRejected}
            >
              <ModeEditOutlineIcon />
            </Button>
            <Button color="primary" onClick={() => handleDeleteLeave(rowData)}>
              <DeleteIcon />
            </Button>
          </Stack>
        );
      },
      sorting: false,
      width: 120,
    },
    
  ];

  if (isLoading || loadingemployee || loadingleaveType) return <>Loading</>;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' sx={{ mt: 3, ml: 1 }} onClick={handleAddOpenModal}>
          +Add Leave
        </Button>
      </Box>
      <br />
      <br />

      <MaterialTable
        columns={columns}
        data={leaveData}
        title=''
        isLoading={loadingleave}
        options={{
          padding: 'dense',
          margin: 50,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
            fontSize: "1rem",
            padding: 'dense',
            height: 50,
          },
          rowStyle: {
            fontSize: ".8rem",
          },
        }}
      />
      {openEditModal && (
        <EditLeaveModal
          id={editedLeave?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openAddModal && (
        <AddLeaveModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Leave"}
        />
      )}
    </>
  );
};

export default Leave;