import React, { useState } from "react";
import { useGetPermission } from "../../../../hooks/auth/permission/usePermission";
import { Stack, Button, Typography, Box } from "@mui/material";
import { AddPermissionModel } from "./Component/AddPermissionModel";
import { EditPermissionModel } from "./Component/EditPermissionModel";

const Permission = () => {
  const { data: permissionData } = useGetPermission();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedPermission, setEditedPermission] = useState({});

  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const getRandomColor = () => {
    const colors = ["#6527BE", "#45CFDD", "#45CFDD", "#9681EB", "#D58BDD"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getPermissionStyle = (permissionName) => {
    switch (permissionName) {
      case "READ":
        return { name: "Read" };
      case "WRITE":
        return { name: "Write" };
      case "EDIT":
        return { name: "Edit" };
      case "DELETE":
        return { name: "Delete" };
      default:
        return { name: permissionName };
    }
  };

  const handleEditPermession = (permissionId) => {
    setEditedPermission(permissionId);
    setOpenEditModal(true);
  };

  return (
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
          + Add Permission
        </Button>
      </Stack>
      {permissionData &&
        permissionData.map((permission, index) => {
          const { name } = getPermissionStyle(permission?.name);
          
          // console.log(editedPermission);
          return (
            <Stack
              key={index}
              sx={{
                alignItems: "center",
                borderBottom: "3px solid gray",
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
                {permission?.id}
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
                  onClick={() => handleEditPermession(permission?.id)}
                >
                  Edit
                </Button>
                <Button color="error" variant="contained">
                  Delete
                </Button>
              </Stack>
            </Stack>
          );
        })}
      {openAddModal && (
        <AddPermissionModel
          open={openAddModal}
          handleCloseModal={handleCloseAddModal}
        />
      )}
      {openEditModal && (
        <EditPermissionModel
          id={editedPermission}
          open={openEditModal}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </Box>
  );
};

export default Permission;
