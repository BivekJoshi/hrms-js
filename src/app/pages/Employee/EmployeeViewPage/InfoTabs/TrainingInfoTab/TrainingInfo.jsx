import { Box, Button } from "@mui/material";
import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTraining } from "../../../../../hooks/training/useTraining";
import FormModal from "../../../../../components/Modal/FormModal";
import { AddTrainingInfo } from "./TrainingModal";

const TrainingInfo = () => {
  const { id } = useParams();
  const { data: trainingData, isLoading } = useGetTraining(id);

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

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
        data={trainingData}
        title="Training History"
        isLoading={isLoading}
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
    </Box>
  );
};

export default TrainingInfo;
