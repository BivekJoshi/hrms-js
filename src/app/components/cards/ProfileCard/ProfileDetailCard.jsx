import React from "react";
import { Button, List, ListItem, Stack, Typography } from "@mui/material";
import male from "../../../../assets/male.png";
import "./style.css";

const ListItemTypography = ({ variant, label, value }) => (
  <ListItem sx={{ display: "flex", gridGap: "4rem" }}>
    <Typography variant={variant} sx={{ flex: "50%" }}>
      {label}
    </Typography>
    <Typography variant="p" sx={{ flex: "50%" }}>
      {value}
    </Typography>
  </ListItem>
);

const ProfileDetailCard = ({ data }) => {

  const hrStyle = {

  };

  return (
    <Stack
      sx={{
        width: "600px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: "1rem 3rem",
        gap: "1rem",
        border: "1px solid #fc6075",
      }}
    >
      <Stack className="profile-img">
        <img
          src={male}
          alt="image"
        />
      </Stack>
      <hr />
      <Stack sx={{ display: "flex", flexDirection: "column" }}>
        <List>
          <ListItemTypography variant="h6" label="Employee Id:" value={data?.id} />
          <ListItemTypography variant="h6" label="Name:" value={data?.name} />
          <ListItemTypography variant="h6" label="Contact Number:" value={data?.mobileNo} />
          <ListItemTypography variant="h6" label="Address:" value={data?.address} />
        </List>
      </Stack>
    </Stack>
  );
};

export default ProfileDetailCard;