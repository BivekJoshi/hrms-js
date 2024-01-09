import { Button, Grid, TextField } from "@mui/material";
import React from "react";

const AddFields = ({ fileds, onClose, handleFormSubmit }) => {
  return (
    <Grid container spacing={3}>
      {fileds}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          variant="contained"
          onClick={handleFormSubmit}
          sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ mt: 3, ml: 1, textTransform: "capitalize" }}
          color="error"
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddFields;
