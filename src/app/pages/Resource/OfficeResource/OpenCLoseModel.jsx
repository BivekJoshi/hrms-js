import { Box, Button, Grid, Modal } from "@mui/material";
import React from "react";

export const OpenCLoseModel = ({
  openModal,
  handleCloseModal,
  modelName,
  setOpenModal,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {modelName}
        <br />
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            onClick={() => setOpenModal(false)}
            color="error"
            variant="contained"
          >
            Close
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};