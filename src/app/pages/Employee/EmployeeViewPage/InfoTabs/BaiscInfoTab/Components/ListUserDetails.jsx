import { Box, Button, CardHeader } from "@mui/material";
import { List, Modal, Typography } from "@mui/material";
import React from "react";

import InfoItem from "./InfoItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ListUserDetails({ cardTitle, data }) {
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <h3>{cardTitle}</h3>
      <List
        sx={{
          bgcolor: "#ededed",
          borderRadius: "1rem",
          padding: "1rem",
        }}
      >
        <Button
          className="editBasicInfoBtn"
          variant="contained"
          onClick={openModal}
          sx={{
            bgcolor: "#1c7ed6",
          }}
        >
          Edit
        </Button>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Edit Basic Info Details
            </Typography>
            <Typography sx={{ mt: 2 }}>Here is the edited Details</Typography>
          </Box>
        </Modal>

        {Object.keys(data).map((item, index) => (
          <InfoItem key={index} field={item} value={data[item]} />
        ))}
      </List>
    </>
  );
}
