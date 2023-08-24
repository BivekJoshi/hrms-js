import React, { useContext } from "react";
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { DialogTitle, Button, CircularProgress } from "@mui/material";
import ThemeModeContext from "../../../theme/ThemeModeContext";

const ActivateConfirmationModal = ({
  open,
  handleCloseModal,
  handleConfirmActive,
  isLoading,
  message,
}) => {
  const { mode } = useContext(ThemeModeContext);

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <Box sx={{ bgcolor: mode === "light" ? "" : "#413e3e" }}>
        <DialogTitle>Confirm Activation</DialogTitle>
        <DialogContent>
          Are you sure you want to Activate this {message}?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseModal} color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmActive}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? "activating..." : "Activate"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ActivateConfirmationModal;
