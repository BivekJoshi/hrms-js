import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import useEditHolidayForm from '../../../hooks/holiday/editHoliday/useEditHolidayForm';
import { useDeleteHoliday } from '../../../hooks/holiday/useHoliday';

const EditHolidayFields = ({ onClose, isLoading, data }) => {
    const { formik } = useEditHolidayForm(data);

    const handleFormSubmit = async () => {
        const isValid = await formik.validateForm(); // Validate the form

        if (isValid) {
            formik.handleSubmit(); // Submit the form

            if (formik.isValid) {
                formik.setTouched({
                    holidayName: false,
                    holidayDate: false,
                    holidayDescription: false,
                });
                onClose(); // Close the modal
            } else {
                toast.error('Please make sure you have filled the form correctly');
            }
        }
    };
    const deleteHolidayMutation = useDeleteHoliday({});
    const handleDeleteHoliday = () => {
        deleteHolidayMutation.mutate(data.id);
        onClose()
    }

    return (
        !isLoading && (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="holidayName"
                        name="holidayName"
                        label="Holiday"
                        placeholder="Enter holiday name"
                        fullWidth
                        value={formik.values.holidayName}
                        onChange={formik.handleChange}
                        error={formik.touched.holidayName && Boolean(formik.errors.holidayName)}
                        helperText={formik.touched.holidayName && formik.errors.holidayName}
                        variant="outlined"
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="holidayDate"
                        name="holidayDate"
                        type='date'
                        required
                        label="Date of Holiday"
                        fullWidth
                        value={formik.values.holidayDate}
                        onChange={formik.handleChange}
                        error={formik.touched.holidayDate && Boolean(formik.errors.holidayDate)}
                        helperText={formik.touched.holidayDate && formik.errors.holidayDate}
                        variant="outlined"
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="holidayDescription"
                        name="holidayDescription"
                        label="Description"
                        placeholder="Enter your Holiday Description"
                        fullWidth
                        value={formik.values.holidayDescription}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.holidayDescription &&
                            Boolean(formik.errors.holidayDescription)
                        }
                        helperText={
                            formik.touched.holidayDescription && formik.errors.holidayDescription
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
                    <Button variant="contained" onClick={handleDeleteHoliday} sx={{ mt: 3, ml: 1 }} color="error">
                        Delete
                    </Button>
                    <Button variant="contained" onClick={handleFormSubmit} sx={{ mt: 3, ml: 1 }}>
                        Update Event
                    </Button>
                    <Button variant="contained" onClick={onClose} sx={{ mt: 3, ml: 1 }} color="error">
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        )
    );
};

export default EditHolidayFields;
