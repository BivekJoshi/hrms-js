import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import ThemeModeContext from "../../../theme/ThemeModeContext";
import CustomButton from "../../utils/Button/Button";

const DeleteConfirmationModal = ({
  open,
  handleCloseModal,
  handleConfirmDelete,
  isLoading,
  message,
}) => {
  const { mode } = useContext(ThemeModeContext);

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <Box sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this {message}?
        </DialogContent>
        <DialogActions>
          <CustomButton
            text={isLoading ? "Deleting..." : "Confirm"}
            type="success"
            onClick={handleConfirmDelete}
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={20} />}
          />
          <CustomButton text="Cancel" onClick={handleCloseModal} type="error" />
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
