import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const WorkShift = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAddOpenModal = () => setOpenAddModal(true);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleAddOpenModal}
        >
          Add Work Shift
        </Button>
      </Box>
      <br />
    </>
  );
};

export default WorkShift;
