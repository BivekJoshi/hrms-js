import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const EmailConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <Box>
          <Typography variant="h5">Do you want to Email this event to Employees?</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={onConfirm}>
              Yes
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{ mt: 3, ml: 1 }}
              color="error"
            >
              No
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
};

export default EmailConfirmationModal;