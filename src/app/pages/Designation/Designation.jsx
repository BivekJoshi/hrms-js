import * as React from "react";
import { useState } from "react";
import MaterialTable from "@material-table/core";
import { Box, Button, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import {
  useDeleteDesignation,
  useGetDesignation,
} from "../../hooks/designation/useDesignation";
import {
  AddDesignationModal,
  EditDesignationModal,
} from "./DesignationModal/DesignationModal";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import { ButtonComponent } from "../../components/Button/ButtonComponent";
import useAuth from "../../../auth/hooks/component/login/useAuth";

const Designation = () => {
  const { data: designationData, isLoading } = useGetDesignation();
const { isSuperAdmin, isAdmin, isHr, isEmployee } = useAuth();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedDesignation, setEditedDesignation] = useState({});
  const [deletedDesignation, setDeletedDesignation] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteDesignationMutation = useDeleteDesignation({});
  const handleDeleteDesignation = (rowData) => {
    setDeletedDesignation(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteDesignationMutation.mutate(deletedDesignation.id);
    setOpenDeleteModal(false);
  };

  const handleEditDesignation = (rowData) => {
    setEditedDesignation(rowData);
    setOpenEditModal(true);
  };

  const columns = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.index + 1,
      width: 50,
      sortable: false,
      sorting: false,
    },
    {
      title: "Designation Name",
      field: "positionName",
      emptyValue: "-",
      width: 200,
      sorting: false,
    },
    {
      title: "Designation Level",
      field: "positionLevel",
      emptyValue: "-",
      width: 200,
      sorting: false,
    },
    {
      title: "Salary",
      field: "salary",
      emptyValue: "-",
      width: 80,
      sorting: false,
    },
    {
      title: "Details",
      field: "positionDetails",
      emptyValue: "-",
      width: 80,
      sorting: false,
    },
    (isSuperAdmin || isAdmin || isHr) && {
      title: "Actions",
      render: (rowData) => (
        <Stack direction="row" spacing={0}>
          <Button
            color="primary"
            onClick={() => handleEditDesignation(rowData)}
          >
            <ModeEditOutlineIcon />
          </Button>
          <Button
            color="primary"
            onClick={() => handleDeleteDesignation(rowData)}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      ),
      sorting: false,

      width: 80,
    },
  ].filter(Boolean);

  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {(isSuperAdmin || isAdmin || isHr) && (
        <ButtonComponent
          OnClick={handleAddOpenModal}
          buttonName={"+Add Designation"}
        />
        )}
      </Box>
      <br />

      <MaterialTable
        columns={columns}
        data={designationData}
        title="Designation List"
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
            textAlign: "center",
            border: "2px solid #fff",
            minHeight: "10px",
            textTransform: "capitilize",
          },
          rowStyle: {
            fontSize: ".8rem",
          },
        }}
      />

      {openEditModal && (
        <EditDesignationModal
          id={editedDesignation?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
      {openAddModal && (
        <AddDesignationModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Designation"}
        />
      )}
    </>
  );
};

export default Designation;
