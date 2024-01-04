import React from "react";
import { useGetLoggedInUser } from "../../../hooks/auth/usePassword";
import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import "../Style/Style.css";
import { DOC_URL } from "../../../../auth/axiosInterceptor";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useGetEmployeeById } from "../../../hooks/employee/useEmployee";

const roleName = [
  {
    id: 1,
    role: 'ROLE_SUPER_ADMIN',
    label: 'Super Admin',
  },
  {
    id: 2,
    role: 'ROLE_MANAGER',
    label: 'Manager',
  },
  {
    id: 3,
    role: 'ROLE_ADMIN',
    label: 'Admin',
  },
  {
    id: 4,
    role: 'ROLE_HR_ADMIN',
    label: 'HR Admin',
  },
  {
    id: 5,
    role: 'ROLE_HR',
    label: 'HR',
  },
  {
    id: 6,
    role: 'ROLE_HR_CLERK',
    label: 'HR Clerk',
  },
  {
    id: 7,
    role: 'ROLE_EMPLOYEE',
    label: 'Employee',
  },
]

const ProfileDetail = () => {
  const { data: loggedUserData } = useGetLoggedInUser();
  const { data: employeeData } = useGetEmployeeById(loggedUserData?.employeeId);

  const photo = loggedUserData?.userPhotoPath;
  const filePath = photo ? DOC_URL + photo : "";
  const userRoleLabel = roleName?.find(role => role?.role === loggedUserData?.role?.name)?.label || "No role assigned yet";

  return (
    <Box
      display="grid"
      gridTemplateRows="1fr"
      justifyContent="center"
      gap="1rem"
      textAlign="center"
    >
      <Stack alignItems="center">
        {employeeData?.employeePhotoPath !== null ? (
          <img
            src={filePath}
            alt="image"
            style={{ borderRadius: "15rem", width: "25%" }}
          />
        ) : (
          <AccountCircleIcon sx={{ width: "9rem", height: "9rem" }} />
        )}
      </Stack>

      <Typography variant="h4">User Information</Typography>
      <Stack sx={{ display: "flex", flexDirection: "column" }}>
        <List sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <Box className="leftGrid">
            <ListItem>User Name :</ListItem>
            <ListItem>Position :</ListItem>
            <ListItem>Mobile:</ListItem>
            <ListItem>Address:</ListItem>
            <ListItem>User Role:</ListItem>
            {/* <ListItem>User Id:</ListItem> */}
            <ListItem>Email:</ListItem>
          </Box>
          <Box>
            <ListItem>
              {employeeData?.firstName} {employeeData?.middleName || ""}{" "}
              {employeeData?.lastName}
            </ListItem>
            <ListItem> {employeeData?.positionName}</ListItem>
            <ListItem> {employeeData?.mobileNumber}</ListItem>
            <ListItem>{loggedUserData?.address}</ListItem>
            <ListItem>
              {userRoleLabel}
            </ListItem>
            {/* <ListItem>{loggedUserData?.id}</ListItem> */}
            <ListItem>{employeeData?.officeEmail}</ListItem>
          </Box>
        </List>
      </Stack>
    </Box>
  );
};

export default ProfileDetail;
