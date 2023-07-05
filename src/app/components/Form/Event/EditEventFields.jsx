import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import useEditEventForm from '../../../hooks/event/editEvent/useEditEventForm';
import { useDeleteEvent } from '../../../hooks/event/useEvent';

const EditEventFields = ({ onClose, isLoading, data }) => {
    const { formik } = useEditEventForm(data);

    const handleFormSubmit = async () => {
        const isValid = await formik.validateForm(); // Validate the form

        if (isValid) {
            formik.handleSubmit(); // Submit the form

            if (formik.isValid) {
                formik.setTouched({
                    eventName: false,
                    eventDate: false,
                    eventTime: false,
                    eventDescription: false,
                });
                onClose(); // Close the modal
            } else {
                toast.error('Please make sure you have filled the form correctly');
            }
        }
    };
    const deleteEventMutation = useDeleteEvent({});
    const handleDeleteEvent = () => {
        deleteEventMutation.mutate(data.id);
        onClose()
    }
    return (
        !isLoading && (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="eventName"
                        name="eventName"
                        label="Event"
                        placeholder="Enter event name"
                        fullWidth
                        value={formik.values.eventName}
                        onChange={formik.handleChange}
                        error={formik.touched.eventName && Boolean(formik.errors.eventName)}
                        helperText={formik.touched.eventName && formik.errors.eventName}
                        variant="outlined"
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="eventDate"
                        name="eventDate"
                        type='date'
                        required
                        label="Date of Event"
                        fullWidth
                        value={formik.values.eventDate}
                        onChange={formik.handleChange}
                        error={formik.touched.eventDate && Boolean(formik.errors.eventDate)}
                        helperText={formik.touched.eventDate && formik.errors.eventDate}
                        variant="outlined"
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="eventTime"
                        name="eventTime"
                        type='time'
                        required
                        label="Time of Event"
                        fullWidth
                        value={formik.values.eventTime}
                        onChange={formik.handleChange}
                        error={formik.touched.eventTime && Boolean(formik.errors.eventTime)}
                        helperText={formik.touched.eventTime && formik.errors.eventTime}
                        variant="outlined"
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="eventDescription"
                        name="eventDescription"
                        label="Description"
                        placeholder="Enter your Event Description"
                        fullWidth
                        value={formik.values.eventDescription}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.eventDescription &&
                            Boolean(formik.errors.eventDescription)
                        }
                        helperText={
                            formik.touched.eventDescription && formik.errors.eventDescription
                        }
                        variant="outlined"
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button variant="contained" onClick={onClose} sx={{ mt: 3, ml: 1 }} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleDeleteEvent} sx={{ mt: 3, ml: 1 }} color="error">
                        Delete
                    </Button>
                    <Button variant="contained" onClick={handleFormSubmit} sx={{ mt: 3, ml: 1 }}>
                        Update Event
                    </Button>
                </Grid>
            </Grid>
        )
    );
};

export default EditEventFields;
