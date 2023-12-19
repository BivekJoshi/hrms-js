import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { useDeleteLeave } from '../../hooks/leave/useLeave';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from '@mui/icons-material/Delete';
import { AddLeaveModal, EditLeaveModal } from './LeaveModal/LeaveModal';
import DeleteConfirmationModal from '../../components/Modal/DeleteConfirmationModal';
import { ButtonComponent } from '../../components/Button/ButtonComponent';
import ThemeModeContext from '../../../theme/ThemeModeContext';
import CustomTable from '../../components/CustomTable/CustomTable';
import { toast } from 'react-toastify';
import { useLeaveDataSearch } from './Api/LeaveApi';
import HocButton from '../../hoc/hocButton';
import PermissionHoc from '../../hoc/permissionHoc';

const Leave = ({ permissions }) => {
  const { mode } = React.useContext(ThemeModeContext);
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

  const { data, isLoading: loading } = useLeaveDataSearch(
    () => {
      console.log('Success');
      toast.success('Successfully Fetch');
    },
    () => {
      console.log('Error');
    }
  );

  console.log('🚀 ~ file: Leave.jsx:57 ~ Leave ~ data:', data);
  const columns = [
    {
      title: 'SN',
      field: 'id',
      sortable: false,
      sorting: false,
      render: (rowData) => rowData.tableData.id + 1,
    },
    {
      title: 'Employee Name',
      field: 'employeeName',
      sorting: false,
    },
    {
      title: 'Leave Type',
      field: 'leaveType',
      sorting: false,
    },
    {
      title: 'From',
      field: 'fromDate',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'To',
      field: 'toDate',
      emptyValue: '-',
      sorting: false,
    },
    {
      title: 'Status',
      field: 'leaveStatus',
      emptyValue: '-',
      cellStyle: {
        whiteSpace: 'nowrap',
      },
      render: (rowData) => {
        const status = rowData.leaveStatus;
        let chipColor = '';

        if (status === 'APPROVED') {
          chipColor = 'green';
        } else if (status === 'REJECTED') {
          chipColor = 'red';
        } else if (status === 'PENDING') {
          chipColor = 'orange';
        }

        return (
          <Chip
            label={status}
            style={{
              backgroundColor: chipColor,
              color: 'white',
              width: '6rem',
            }}
          />
        );
      },
      sorting: false,
    },
    {
      title: 'Leave Reason',
      field: 'leaveReason',
      emptyValue: '-',
      render: (rowData) => {
        return (
          <Tooltip
            title={<div>{rowData?.leaveReason}</div>}
            placement='top-start'
            arrow
          >
            <Chip
              style={{
                cursor: 'pointer',
                width: '240px',
                // height: '40px',
                display: 'block',
                background: mode === 'light' ? 'white' : '#434343',
              }}
              label={
                <Typography
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {rowData?.leaveReason}
                </Typography>
              }
            />
          </Tooltip>
        );
      },
    },
    {
      title: 'Remark',
      field: 'leaveRemarks',
      width: '240px',
      emptyValue: '-',
      render: (rowData) => {
        return (
          <Tooltip title={rowData?.leaveRemarks} placement='top-start' arrow>
            <Chip
              style={{
                cursor: 'pointer',
                width: '240px',
                display: 'block',
                background: mode === 'light' ? 'white' : '#434343',
              }}
              label={
                <Typography
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {rowData?.leaveRemarks}
                </Typography>
              }
            />
          </Tooltip>
        );
      },
    },

    {
      title: 'Approved By',
      width: '80px',
      sorting: false,
      field: 'approvedBy',
    },
    // {
    //   title: 'Actions',
    //   width: '10px',
    //   render: (rowData) => {
    //     const isApprovedOrRejected = ['APPROVED', 'REJECTED'].includes(
    //       rowData.leaveStatus
    //     );

    //     return (
    //       <Stack direction='row' spacing={0}>
    //         <Button
    //           color='primary'
    //           onClick={() => handleEditLeave(rowData)}
    //           disabled={isApprovedOrRejected}
    //         >
    //           <ModeEditOutlineIcon />
    //         </Button>
    //         <Button color='primary' onClick={() => handleDeleteLeave(rowData)}>
    //           <DeleteIcon />
    //         </Button>
    //       </Stack>
    //     );
    //   },
    //   sorting: false,
    // },
  ].filter(Boolean);

  const actions = [
    {
      icon: () => (
        <HocButton
          permissions={permissions?.canEdit}
          icon={<ModeEditOutlineIcon />}
        />
      ),
      tooltip: "Edit Leave",
      onClick: (event, rowData) => handleEditLeave(rowData),
    },
    {
      icon: () => (
        <HocButton permissions={permissions?.canDelete} icon={<DeleteIcon />} />
      ),
      tooltip: "Delete Leave",
      onClick: (event, rowData) => handleDeleteLeave(rowData),
    },
  ]

  // if (isLoading || loadingemployee || loadingleaveType) return <>Loading</>;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '16px',
        }}
      >
        <ButtonComponent
          OnClick={handleAddOpenModal}
          Border='none'
          color={'#fff'}
          buttonName={'+ Add Leave'}
        />
      </Box>

      <CustomTable
        columns={columns}
        data={data}
        title='Leave Data'
        actions={actions}
        isLoading={loading}
      />
      {openEditModal && (
        <EditLeaveModal
          data={editedLeave}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
          title={'Edit Leave'}
          
        />
      )}
      {openAddModal && (
        <AddLeaveModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
          title={'Apply Leave'}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={'Leave'}
        />
      )}
    </>
  );
};

export default PermissionHoc(Leave);
