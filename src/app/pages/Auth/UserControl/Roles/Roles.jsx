import React, { useState } from "react";
import { useDeleteRole, useGetRole } from "../../../../hooks/auth/roles/useRole";
import { Box, Button, Typography, Stack } from "@mui/material";
import { AddRoleModal } from "./AddRoleModal";
import DeleteConfirmationModal from "../../../../components/Modal/DeleteConfirmationModal";

const Roles = () => {
  const { data: roleData } = useGetRole();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editedRole, setEditedRole] = useState({});
  const [deletedRole, setDeletedRole] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const getRandomColor = () => {
    const colors = ["blue", "green", "navy", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRoleStyle = (roleName) => {
    switch (roleName) {
      case "SUPER_ADMIN":
        return { name: "Super Admin" };
      case "HR_CLERK":
        return { name: "HR Clerk" };
      case "ADMIN":
        return { name: "Admin" };
      case "EMPLOYEE":
        return { name: "Employee" };
      case "CLIENT":
        return { name: "Client" };
      default:
        return { name: roleName };
    }
  };

  const handleEditRole = (roleData) => {
    setEditedRole(roleData);
    setOpenEditModal(true);
  };

  const deleteRoleMutation = useDeleteRole({});
  const handleDeleteRole = (roleData) => {
    setDeletedRole(roleData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteRoleMutation.mutate(deletedRole?.id);
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginY: "1rem",
        }}
      >
        <Stack sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ maxWidth: "fit-content" }}
            onClick={handleAddOpenModal}
          >
            Add
          </Button>
        </Stack>
        {roleData &&
          roleData.map((role, index) => {
            const { name } = getRoleStyle(role?.name);

            return (
              <Stack
                key={index}
                sx={{
                  alignItems: "center",
                  borderBottom: "1px solid gray",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "1rem",
                  backgroundColor: getRandomColor(),
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {role?.id}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {name}
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "0.7rem",
                  }}
                >
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => handleEditRole(roleData)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDeleteRole(roleData)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
            );
          })}
      </Box>
      {openAddModal && (
        <AddRoleModal
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {/* {openEditModal && (
        <EditRoleModal
          id={editedDesignation?.id}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )} */}
      {openDeleteModal && (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          message={"Role"}
        />
      )}
    </>
  );
};

export default Roles;
