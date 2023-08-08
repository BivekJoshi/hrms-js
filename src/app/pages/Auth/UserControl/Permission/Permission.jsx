import React from "react";
import { useGetPermission } from "../../../../hooks/auth/permission/usePermission";
import { Stack, Button, Typography, Box } from "@mui/material";

const Permission = () => {
  const { data: permissionData } = useGetPermission();

  const getRandomColor = () => {
    const colors = ["blue", "green", "navy", "purple"];
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
                        <Stack sx={{display: "flex", flexDirection: "row-reverse"}}><Button color="primary" variant="contained" sx={{maxWidth: "fit-content"}}>
                  Add
                </Button></Stack>
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
      ;
    </Box>
  );
};

export default Permission;
