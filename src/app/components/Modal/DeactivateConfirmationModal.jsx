import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';

const DeactivateConfirmationModal = ({ open, handleCloseModal, handleConfirmDeactive, isLoading ,message}) => {
    return (
        <Dialog open={open} onClose={handleCloseModal}>
            <DialogTitle>Confirm DeActivation</DialogTitle>
            <DialogContent>
                Are you sure you want to DeActivate this {message}?
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleCloseModal}
                    color="error"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleConfirmDeactive}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} /> : null}
                >
                    {isLoading ? 'deactivating...' : 'Deactivate'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeactivateConfirmationModal;