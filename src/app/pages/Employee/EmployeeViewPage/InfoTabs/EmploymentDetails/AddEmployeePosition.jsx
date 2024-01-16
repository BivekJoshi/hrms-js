import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Box,
} from "@mui/material";
import ThemeModeContext from "../../../../../../theme/ThemeModeContext";
import CustomButton from "../../../../../utils/Button/Button";

const AddEmpoyeePosition = ({ open, handleCloseModal, handleConfirm }) => {
  const { mode } = useContext(ThemeModeContext);

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <Box sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}>
        <DialogTitle>Confirm Add Position</DialogTitle>
        <DialogContent>
          Are you sure you want to add multi-position?
        </DialogContent>
        <DialogActions>
          <CustomButton
            text={"Confirm"}
            type="success"
            onClick={handleConfirm}
          />
          <CustomButton text="Cancel" onClick={handleCloseModal} type="error" />
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddEmpoyeePosition;
