import { Box, Button, Stack } from "@mui/material";
import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDeleteTraining } from "../../../../../hooks/training/useTraining";
import { AddTrainingInfo, EditTrainingInfo } from "./TrainingModal";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteConfirmationModal from "../../../../../components/Modal/DeleteConfirmationModal";

const TrainingInfo = ({ data }) => {
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
      width: 300,
    },
    {
      title: "Training Level",
      field: "trainingLevel",
      emptyValue: "-",
      width: 200,
    },
    {
      title: "Institude",
      field: "trainingInstitute",
      emptyValue: "-",
      width: 200,
    },
    {
      title: "Category",
      field: "category",
      emptyValue: "-",
      width: 200,
    },
    {
      title: "Start Date",
      field: "startDate",
      emptyValue: "-",
      width: 200,
    },
    {
      title: "End Date",
      field: "endDate",
      emptyValue: "-",
      width: 200,
    },
    {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
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
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: "1rem",
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

      {openEditModal && (
        <EditTrainingInfo
          empId={id}
          id={editedTraining?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </Box>
  );
};

export default TrainingInfo;
