import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';

const ActivateConfirmationModal = ({ open, handleCloseModal, handleConfirmActive, isLoading ,message}) => {
    return (
        <Dialog open={open} onClose={handleCloseModal}>
            <DialogTitle>Confirm Activation</DialogTitle>
            <DialogContent>
                Are you sure you want to Activate this {message}?
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
                    onClick={handleConfirmActive}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} /> : null}
                >
                    {isLoading ? 'activating...' : 'Activate'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ActivateConfirmationModal;
