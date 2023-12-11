import * as React from "react";
import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  useDeleteDesignation,
  useGetDesignation,
} from "../../hooks/designation/useDesignation";
import {
  AddDesignationModal,
  EditDesignationModal,
} from "./DesignationModal/DesignationModal";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import PermissionHoc from "../../hoc/permissionHoc";
import HocButton from "../../hoc/hocButton";
import CustomTable from "../../components/CustomTable/CustomTable";

const Designation = ({ permissions }) => {
  const { data: designationData, isLoading } = useGetDesignation();

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
      render: (rowData) => rowData.tableData.id + 1,
      maxWidth: "1px",
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
      sorting: false,
    },
  ].filter(Boolean);

  const actions=[
    {
      icon:()=><EditIcon/>,
      tooltip: "Edit Detail",
      onClick: (event, rowData) => handleEditDesignation(rowData),
    },
    {
      icon:()=><DeleteIcon/>,
      tooltip: "Delete",
      onClick: (event, rowData) => handleDeleteDesignation(rowData),
    }
  ];
  if (isLoading) return <>Loading</>;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HocButton
          permissions={permissions?.canAdd}
          color={"primary"}
          variant={"contained"}
          onClick={handleAddOpenModal}
          buttonName={"+ Add Designation"}
        />
      </Box>
      <br />
      <CustomTable
        columns={columns}
        data={designationData}
        title="Designation List"
        isLoading={isLoading}
        actions={actions}
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

export default PermissionHoc(Designation);
