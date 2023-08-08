import React from "react";
import { useGetRole } from "../../../../hooks/auth/roles/useRole";
import { Box, Button, Typography, Stack } from "@mui/material";

const Roles = () => {
  const { data: roleData } = useGetRole();

  const getRandomColor = () => {
    const colors = ["#9A7CA2", "#AE6F92", "#9F43C7", "#DC418F", "#6BA1B3", "#FF869E"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRoleStyle = (roleName) => {
    switch (roleName) {
      case "SUPER_ADMIN":
        return { name: "Super Admin" };
      case "HR_CLERK":
        return { name: "Hr Clerk" };
      case "ADMIN":
        return { name: "Admin" };
      case "EMPLOYEE":
        return { name: "Employee" };
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
    </Box>
  );
};

export default Roles;
