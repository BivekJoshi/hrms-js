import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import ThemeModeContext from "../../../theme/ThemeModeContext";

const DeactivateConfirmationModal = ({
  open,
  handleCloseModal,
  handleConfirmDeactive,
  isLoading,
  message,
}) => {
  const { mode } = useContext(ThemeModeContext);

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <Box sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}>
        <DialogTitle>Confirm DeActivation</DialogTitle>
        <DialogContent>
          Are you sure you want to DeActivate this {message}?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseModal} color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmDeactive}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? "deactivating..." : "Deactivate"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeactivateConfirmationModal;
