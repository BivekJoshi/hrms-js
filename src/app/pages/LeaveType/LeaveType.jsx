import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import {
  useDeleteLeaveType,
  useGetLeaveType,
} from '../../hooks/leaveType/useLeaveType';
import {
  AddLeaveTypeModal,
  EditLeaveTypeModal,
} from './LeaveTypeModal/LeaveTypeModal';
import DeleteConfirmationModal from '../../components/Modal/DeleteConfirmationModal';
import PermissionHoc from '../../hoc/permissionHoc';
import HocButton from '../../hoc/hocButton';
import useAuth from '../../../auth/hooks/component/login/useAuth';
import CustomTable from '../../components/CustomTable/CustomTable';

const LeaveType = ({ permissions }) => {
  const { data: leaveTypeData, isLoading } = useGetLeaveType();
  const { isSuperAdmin, isEmployee } = useAuth();

  const [existingLeaveTypes, setExistingLeaveTypes] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedLeaveType, setEditedLeaveType] = useState({});
  const [deletedLeaveType, setDeletedLeaveType] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteLeaveTypeMutation = useDeleteLeaveType({});
  const handleDeleteLeaveType = (rowData) => {
    setDeletedLeaveType(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteLeaveTypeMutation.mutate(deletedLeaveType.id);
    setOpenDeleteModal(false);
  };

  const handleEditLeaveType = (rowData) => {
    setEditedLeaveType(rowData);
    setOpenEditModal(true);
  };

  useEffect(() => {
    if (leaveTypeData) {
      const leaveNames = leaveTypeData.map((leaveType) => leaveType.leaveName);
      setExistingLeaveTypes(leaveNames);
    }
  }, [leaveTypeData]);

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      width: '1%',
      sortable: false,
      sorting: false,
    },
    {
      title: 'Leave Name',
      field: 'leaveName',
      render: (rowData) => {
        const formattedLeaveName =
          rowData.leaveName.charAt(0).toUpperCase() +
          rowData.leaveName.slice(1).toLowerCase();
        return `${formattedLeaveName} Leave`;
      },
      width: '10%',
      sortable: false,
      sorting: false,
    },
    {
      title: 'Leave Days',
      field: 'leaveTotal',
      emptyValue: '-',
      // width: 15,
      sortable: false,
      sorting: false,
    },
    {
      title: 'Carry Forward',
      field: 'isCarryForward',
      emptyValue: '-',
      // width: 10,
      render: (rowData) => (rowData.isCarryForward ? 'Yes' : 'No'),
      sortable: false,
      sorting: false,
    },
    {
      title: 'Description',
      field: 'leaveDescription',
      sortable: false,
      sorting: false,
      emptyValue: '-',
    },

    {
      title: 'Actions',
      render: (rowData) => (
        <Stack direction='row' spacing={0}>
          <HocButton
            permissions={permissions}
            color={'primary'}
            onClick={() => handleEditLeaveType(rowData)}
            icon={<ModeEditOutlineIcon />}
          />
          <HocButton
            permissions={permissions}
            color={'primary'}
            onClick={() => handleDeleteLeaveType(rowData)}
            icon={<DeleteIcon />}
          />
        </Stack>
      ),
      sorting: false,
      // width: 2,
    },
  ];

  if (isLoading) return <>Loading</>;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <HocButton
          permissions={permissions}
          color='white'
          variant={'contained'}
          onClick={handleAddOpenModal}
          buttonName={'+ Add Leave Type'}
        />
      </Box>
      <br></br>
      <CustomTable
        columns={columns}
        data={leaveTypeData}
        title='Leave Type'
        isLoading={isLoading}
      />
      {openEditModal && (
        <EditLeaveTypeModal
          id={editedLeaveType?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openAddModal && (
        <AddLeaveTypeModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
          existingLeaveTypes={existingLeaveTypes}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={'Leave Type'}
        />
      )}
    </>
  );
};

export default PermissionHoc(LeaveType);
