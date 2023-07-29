import { Box, Button, List, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import InfoItem from "./InfoItem";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {cardTitle}
        </Typography>
        <Stack sx={{display: "flex", alignItems: "center" }}>
          <BorderColorIcon
            onClick={openModal}
            fontSize="large"
            sx={{ color: "rgb(28, 126, 214)", paddingRight: "1rem" }}
          />
        </Stack>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Edit Basic Info Details
            </Typography>
            <Typography sx={{ mt: 2 }}>Here is the edited Details</Typography>
          </Box>
        </Modal>

      </Box>
      <List sx={{ bgcolor: "#ededed", borderRadius: "1rem" }}>
        {Object.keys(data).map((item, index) => (
          <InfoItem key={index} field={item} value={data[item]} />
        ))}
      </List>
    </>
  );
}
