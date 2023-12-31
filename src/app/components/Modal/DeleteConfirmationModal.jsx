import React, { useContext } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import ThemeModeContext from '../../../theme/ThemeModeContext';

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
      <Box sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this {message}?
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={handleConfirmDelete}
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={20} />}
            color='success'
          >
            {isLoading ? 'Deleting...' : 'Confirm'}
          </Button>
          <Button variant='contained' onClick={handleCloseModal} color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
