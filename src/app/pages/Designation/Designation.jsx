import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import { Stack, Button } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import FormModal from "../../components/Modal/FormModal";
import {
  useDeleteDesignation,
  useGetDesignation,
} from "../../hooks/designation/useDesignation";
import AddDesignationForm from "../../components/Form/Designation/AddDesignationField";
import { AddDesignatioModal, EditDesignationModal } from "./DesignationModal";

const Designation = () => {
  const { data: designationData, isLoading } = useGetDesignation();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editedDesignation, setEditedDesignation] = useState(null);

  const deleteDesignationMutation = useDeleteDesignation({});
  const handleDeleteDesignation = (posId) => {
    deleteDesignationMutation.mutate(posId);
  };

  const handleEditDesignation = (rowData) => {
    setEditedDesignation(rowData);
    setOpenEditModal(true);
  };
  // const handleEditField = (field) => {
  //   setSelectedField(field);
  // };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseEditModal = () => setOpenEditModal(false);

  if (isLoading) return <>Loading</>;

  const column = [
    {
      title: "SN",
      render: (rowData) => rowData.tableData.id + 1,
      cellStyle: {
        whiteSpace: "nowrap",
      },
      width: 80,
    },
    {
      title: "Designation Name",
      field: "positionName",
      emptyValue: "-",
      width: 200,
    },
    {
      title: "Designation Level",
      field: "positionLevel",
      emptyValue: "-",
      width: 100,
    },
    {
      title: "Salary",
      field: "salary",
      emptyValue: "-",
      width: 200,
    },
    {
      title: "Details",
      field: "positionDetails",
      emptyValue: "-",
    },
    {
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
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleOpenModal}
            sx={{ mt: 3, ml: 1 }}
          >
            +Add Designation
          </Button>
        </Stack>
        <br />
        <br />
      </div>

      <MaterialTable
        columns={column}
        data={designationData}
        title=""
        isLoading={isLoading}
        options={{
          padding: "dense",
          margin: 50,
          pageSize: 12,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: "#1c7ed6",
            color: "#FFF",
            fontSize: 20,
            padding: "dense",
            height: 50,
          },
          rowStyle: {
            fontSize: 18,
          },
        }}
      />

      {openEditModal && (
        <EditDesignationModal
          id={editedDesignation?.id}
          open={openEditModal}
          onClose={handleCloseEditModal}
          // formComponent={
          //   <DesignationForm
          //     id={editedDesignation?.id}
          //     onClose={handleCloseEditModal}
          //   />
          // }
        />
      )}

      {openAddModal && (
        <AddDesignatioModal
          open={openAddModal}
          onClose={handleCloseAddModal}
          // formComponent={<AddDesignationForm onClose={handleCloseAddModal} />}
        />
      )}

      <FormModal
        open={openModal}
        onClose={handleCloseModal}
        formComponent={<AddDesignationForm onClose={handleCloseModal} />}
      />
    </>
  );
};

export default Designation;
