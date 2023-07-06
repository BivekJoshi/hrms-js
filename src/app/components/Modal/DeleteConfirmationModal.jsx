import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';

const DeleteConfirmationModal = ({ open, handleCloseModal, handleConfirmDelete, isLoading ,message}) => {
    return (
        <Dialog open={open} onClose={handleCloseModal}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this {message}?
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleCloseModal}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleConfirmDelete}
                    color="error"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} /> : null}
                >
                    {isLoading ? 'Deleting...' : 'Confirm'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
