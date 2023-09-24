import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import tableIcons from "../../../../theme/overrides/TableIcon";
import { useGetOfficeResource } from "../../../hooks/resource/officeResource/useOfficeResource";
import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import {
  AddOfficeResourceModal,
  EditOfficeResourceModal,
} from "./OfficeResourceModal";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { ButtonComponent } from "../../../components/Button/ButtonComponent";
import DeactivatedOfficeResource from "./DeactivatedOfficeResource";

const OfficeResource = () => {
  const { data: officeResourceData, isLoading } = useGetOfficeResource();
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [editedRowData, setEditedRowData] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleEditRowData = (rowData) => {
    setEditedRowData(rowData);
    setOpenEditModal(true);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData?.tableData?.index + 1,
      width: "3.125rem",
      sortable: false,
      sorting: false,
    },
    {
      title: "Appliance Name",
      field: "name",
      emptyValue: "-",
      width: "18.75rem",
      sorting: false,
    },
    {
      title: "Identification Number",
      field: "uniqueNumber",
      emptyValue: "-",
      width: "18.75rem",
      sorting: false,
    },
    {
      title: "Description",
      field: "description",
      emptyValue: "-",
      width: "57rem",
      sorting: false,
    },
  ];
  const actions = [
    {
      icon: () => <ModeEditOutlineIcon sx={{ color: "#01579B" }} />,
      tooltip: "Edit Logistics",
      onClick: (event, rowData) => handleEditRowData(rowData),
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          padding: ".5rem 0",
        }}
      >
        <ButtonComponent
          OnClick={() => {
            navigate(`Deactivated`);
          }}
          buttonName={"Deactivated Office Logistics"}
          BGColor="white"
          TextColor="black"
        />
        <ButtonComponent
          OnClick={handleAddOpenModal}
          buttonName={"+Add Office Logistics"}
        />
      </Box>
      <br />
      <br />
      <MaterialTable
        icons={tableIcons}
        title="Office Logistics"
        columns={columns}
        data={officeResourceData}
        isLoading={isLoading}
        options={{
          exportButton: true,
          padding: "dense",
          margin: 50,
          pageSize: 20,
          emptyRowsWhenPaging: false,
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontSize: "1rem",
            padding: "dense",
            height: 50,
            textAlign: "center",
            border: "2px solid #fff",
            minHeight: "10px",
            textTransform: "capitilize",
          },
          rowStyle: {
            fontSize: ".8rem",
          },
        }}
        actions={actions}
      />
      {openAddModal && (
        <AddOfficeResourceModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openEditModal && (
        <EditOfficeResourceModal
          id={editedRowData?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <DeactivatedOfficeResource />
          <br/>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              onClick={() => setOpenModal(false)}
              color="error"
              variant="contained"
            >
              Close
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default OfficeResource;
