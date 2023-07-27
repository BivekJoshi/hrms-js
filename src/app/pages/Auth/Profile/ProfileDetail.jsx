import { flexibleCompare } from "@fullcalendar/core/internal";
import { Button, List, ListItem, Stack, Typography } from "@mui/material";
import React from "react";

const hrStyle = {
  border: "2px dashed #a96e3b",
  margin: "12px 0px",
};

const style = {
  padding: "1rem 4rem",
  border: "1px solid #fc6075",
  display: "flex",
};
const imgStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
};
const ProfileDetail = () => {
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Stack
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "1rem 3rem",
            gap: "4rem",
            alignItems: "center",
            border: "1px solid #fc6075",
          }}
        >
          <Stack sx={{ width: "100px", height: "100px" }}>
            <img
              sx={imgStyle}
              src="https://smarthr.dreamguystech.com/materialize/template/assets/img/profiles/avatar-02.jpg"
              alt="image"
            />
          </Stack>
          <Stack
            sx={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
          >
            <Typography variant="h5">John Doe</Typography>
            <Typography variant="h6">Admin</Typography>
            <Typography variant="h5">Employee Id: 4</Typography>
            <Typography variant="h5">Date Of Join: 2023-06-12</Typography>
            <Button
              variant="h5"
              sx={{
                marginTop: "12px",
                borderRadius: "12px",
                lineHeight: "1.5rem",
                background:
                  "linear-gradient(to right, #ff9b44 0%, #fc6075 100%)",
                color: "#ffffff",
                border: "1px solid #ff9b44",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "400",
                padding: "2px 12px",
              }}
            >
              Send Message
            </Button>
          </Stack>
        </Stack>
        <hr style={hrStyle} />

        <Stack style={style}>
          <List>
            <ListItem>
              <Typography variant="h5">Email: </Typography>
              <Typography variant="h6">John@gmail.com</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h5">BirthDay: </Typography>
              <Typography variant="h6">1997-08-96</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h5">Address: </Typography>
              <Typography variant="h6">Mnr kathmandu</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h5">Gender: </Typography>
              <Typography variant="h6">Male</Typography>
            </ListItem>
          </List>
        </Stack>
      </Stack>

      <hr />

      <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        <Stack sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">Personal Details: </Typography>
          <Stack style={style}>
            <List>
              <ListItem>
                <Typography variant="h5">Name: </Typography>
                <Typography variant="h6">John Doe</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h5">Phone: </Typography>
                <Typography variant="h6">27864238462873</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h5">Nationality: </Typography>
                <Typography variant="h6">Nepal</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h5">Marital Status: </Typography>
                <Typography variant="h6">Unmarried</Typography>
              </ListItem>
            </List>
          </Stack>
        </Stack>
        <Stack>
          <Stack>
            <Typography>Emergency Contact:</Typography>
            <Stack className="style" style={style}>
              <List>
                <ListItem>
                  <Typography variant="h5">Name: </Typography>
                  <Typography variant="h6">Dev Doe</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h5">Relationsgip: </Typography>
                  <Typography variant="h6">Father</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h5">Phone: </Typography>
                  <Typography variant="h6">6438723</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h5">Other Contact: </Typography>
                  <Typography variant="h6">478272424</Typography>
                </ListItem>
              </List>
            </Stack>
            <hr />
            <Typography variant="h4">Bank Details:</Typography>
            <Stack style={{ style }}>
              <List>
                <ListItem>
                  <Typography variant="h5">Bank Name: </Typography>
                  <Typography variant="h6">Sanima Bank</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h5">Account Number: </Typography>
                  <Typography variant="h6">7682428</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h5">Pan Number: </Typography>
                  <Typography variant="h6">6438723</Typography>
                </ListItem>
              </List>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ProfileDetail;
