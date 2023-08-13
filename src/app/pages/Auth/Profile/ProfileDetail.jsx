import React from "react";
import { useGetLoggedInUser } from "../../../hooks/auth/usePassword";
import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import "../Style/Style.css";

const ProfileDetail = () => {
  const { data: loggedUserData } = useGetLoggedInUser();
  
  return (
    <Box
      display="grid"
      gridTemplateRows="1fr"
      justifyContent="center"
      gap="1rem"
      textAlign="center"
    >
      <Stack alignItems="center">
        <img
          src="https://smarthr.dreamguystech.com/materialize/template/assets/img/profiles/avatar-02.jpg"
          alt="image"
          style={{ borderRadius: "15rem", width:"25%" }}
        />
      </Stack>

      <Typography variant="h4">User Information</Typography>
      <Stack sx={{ display: "flex", flexDirection: "column" }}>
        <List sx={{ display:"grid", gridTemplateColumns:"1fr 1fr"}}>
          <Box className="leftGrid">
            <ListItem>User Name :</ListItem>
            <ListItem>Mobile:</ListItem>
            <ListItem>Address:</ListItem>
            <ListItem>User Type:</ListItem>
            <ListItem>User Id:</ListItem>
            <ListItem>Email:</ListItem>
          </Box>
          <Box>

            <ListItem>{loggedUserData?.name}</ListItem>
            <ListItem> {loggedUserData?.mobileNo}</ListItem>
            <ListItem>{ loggedUserData?.address}</ListItem>
            <ListItem>{loggedUserData?.roles[0]?.name || "no roles Assigned"}</ListItem>
            <ListItem>{loggedUserData?.id}</ListItem>
            <ListItem>{loggedUserData?.email}</ListItem>
          </Box>
        </List>
      </Stack>
    </Box>
  );
};

export default ProfileDetail;
