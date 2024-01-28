import { Box, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useDeleteTraining,
  useGetTrainingByEmpId,
} from "../../../../../hooks/training/useTraining";
import { AddTrainingInfo, EditTrainingInfo } from "./TrainingModal";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteConfirmationModal from "../../../../../components/Modal/DeleteConfirmationModal";
import useAuth from "../../../../../../auth/hooks/component/login/useAuth";
import { useGetLoggedInUserInfo } from "../../../../../hooks/employee/useEmployee";
import CustomTable from "../../../../../components/CustomTable/CustomTable";
import ThemeModeContext from "../../../../../../theme/ThemeModeContext";

const TrainingInfo = ({ data, role }) => {
  const { isEmployee } = useAuth();
  const { data: loggedInUserData, isLoading: isLoading } = isEmployee
    ? useGetLoggedInUserInfo()
    : {};

  const { id } = useParams();
  const { data: trainingData } = role
    ? useGetTrainingByEmpId(id)
    : useGetTrainingByEmpId(data?.id);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const [deletedTraining, setDeletedTraining] = useState({});
  const [editedTraining, setEditedTraining] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const deleteTrainingMutation = useDeleteTraining({});
  const handleDeleteTraining = (rowData) => {
    setDeletedTraining(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteTrainingMutation.mutate(deletedTraining.id);
    setOpenDeleteModal(false);
  };

  const handleEditTraining = (rowData) => {
    setEditedTraining(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: 'SN',
      render: (rowData) => rowData.tableData.id + 1,
      width: '3%',
      maxWidth: '50px',
      sortable: false,
      sorting: false,
    },
    {
      title: 'Training Name',
      field: 'trainingName',
      emptyValue: '-',
      width: 100,
    },
    {
      title: 'Training Level',
      field: 'trainingLevel',
      emptyValue: '-',
      width: 100,
    },
    {
      title: 'Institute',
      field: 'trainingInstitute',
      emptyValue: '-',
      width: 100,
    },
    {
      title: 'Category',
      field: 'category',
      emptyValue: '-',
      width: 90,
    },
    {
      title: 'Start Date',
      field: 'startDate',
      emptyValue: '-',
      width: 85,
    },
    {
      title: 'End Date',
      width: 75,
      field: 'endDate',
      emptyValue: '-',
    },
  ];
  const { mode } = React.useContext(ThemeModeContext);

  const actions = [
    {
      icon: () => (
        <ModeEditOutlineIcon
          sx={{
            color: mode === "light" ? "black" : "white",
            "&:hover": {
              color: "green",
            },
          }}
        />
      ),
      tooltip: 'Edit Detail',
      onClick: (event, rowData) => handleEditTraining(rowData),
    },
    {
      icon: () => (
        <DeleteIcon
          sx={{
            color: mode === "light" ? "black" : "white",
            "&:hover": {
              color: "red",
            },
          }}
        />
      ),
      tooltip: 'Delete',
      onClick: (event, rowData) => handleDeleteTraining(rowData),
    },
  ];
  return (
    <Box className='tableIcon'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingBottom: '10px',
        }}
      >
        {!isEmployee && (
          <Button
            variant='contained'
            sx={{ mt: 3, ml: 1 }}
            onClick={handleAddOpenModal}
          >
            Add
          </Button>
        )}
      </Box>

      <CustomTable
        columns={columns}
        data={trainingData}
        title='Training History'
        actions={actions}
      />

      {openAddModal && (
        <AddTrainingInfo
          title={'Add Training History'}
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={'Employee Training'}
        />
      )}

      {(openEditModal && !isEmployee && (
        <EditTrainingInfo
          title={'Edit Training'}
          empId={id}
          data={editedTraining}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )) || (
        <EditTrainingInfo
          empId={loggedInUserData?.id}
          id={editedTraining?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </Box>
  );
};

export default TrainingInfo;
