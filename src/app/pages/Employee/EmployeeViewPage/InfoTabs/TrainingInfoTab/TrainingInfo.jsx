import { Box, Button, Stack } from "@mui/material";
import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDeleteTraining } from "../../../../../hooks/training/useTraining";
import { AddTrainingInfo, EditTrainingInfo } from "./TrainingModal";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteConfirmationModal from "../../../../../components/Modal/DeleteConfirmationModal";
import useAuth from "../../../../../../auth/hooks/component/login/useAuth";
import { useGetLoggedInUserInfo } from "../../../../../hooks/employee/useEmployee";

const TrainingInfo = ({ data }) => {
  const { isEmployee } = useAuth();
  const { data: loggedInUserData, isLoading: isLoadingUserData } = isEmployee
    ? useGetLoggedInUserInfo()
    : {};
  const { id } = useParams();

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
      title: "Training Name",
      field: "trainingName",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "Training Level",
      field: "trainingLevel",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "Institude",
      field: "trainingInstitute",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "Category",
      field: "category",
      emptyValue: "-",
      width: 90,
    },
    {
      title: "Start Date",
      field: "startDate",
      emptyValue: "-",
      width: 85,
    },
    {
      title: "End Date",
      width: 75,

      field: "endDate",
      emptyValue: "-",
    },
    {
      title: "Actions",
      width: 75,
      render: (rowData) => (
        <Stack direction="row" justifyContent={"space-evenly"}>
          <Button color="primary" onClick={() => handleEditTraining(rowData)}>
            <ModeEditOutlineIcon />
          </Button>
          <Button color="primary" onClick={() => handleDeleteTraining(rowData)}>
            <DeleteIcon />
          </Button>
        </Stack>
      ),
    },
  ];
  return (
    <Box className="tableIcon">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={handleAddOpenModal}
        >
          +Add Training
        </Button>
      </Box>
      <MaterialTable
        style={{ padding: "1rem" }}
        columns={columns}
        data={Array.isArray(data?.trainings) ? data?.trainings : []}
        title="Training History"
        // isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 10,
          tableLayout: "fixed",
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: ".9rem",
            padding: "dense",
            height: 50,
          },
          rowStyle: {
            fontSize: 13,
          },
        }}
      />

      {openAddModal && (
        <AddTrainingInfo
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Employee Training"}
        />
      )}

      {(openEditModal && !isEmployee && (
        <EditTrainingInfo
          empId={id}
          id={editedTraining?.id}
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
