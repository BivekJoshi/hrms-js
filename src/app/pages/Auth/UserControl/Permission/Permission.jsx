import React, { useState } from "react";
import { useGetPermission } from "../../../../hooks/auth/permission/usePermission";
import { Stack, Button, Typography, Box } from "@mui/material";
import { AddPermissionModel } from "./Component/AddPermissionModel";

const Permission = () => {
  const { data: permissionData } = useGetPermission();
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddOpenModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const getRandomColor = () => {
    const colors = ["#6527BE", "#45CFDD", "#45CFDD", "#9681EB", "#D58BDD"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getPermissionStyle = (roleName) => {
    switch (roleName) {
      case "READ":
        return { name: "Read" };
      case "WRITE":
        return { name: "Write" };
      case "EDIT":
        return { name: "Edit" };
      case "DELETE":
        return { name: "Delete" };
      default:
        return { name: roleName };
    }
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
        permissionData.map((role, index) => {
          const { name } = getPermissionStyle(role?.name);
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
                <Button color="secondary" variant="contained">
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
    </Box>
  );
};

export default Permission;
