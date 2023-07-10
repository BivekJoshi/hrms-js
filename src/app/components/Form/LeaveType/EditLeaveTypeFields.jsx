import {
    Grid,
    TextField,
    Button,
    FormControlLabel,
} from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { ThemeSwitch } from '../../../../theme/ThemeSwitch';
import useEditLeaveTypeForm from '../../../hooks/leaveType/editLeaveType/useEditLeaveTypeForm';

const EditLeaveTypeFields = ({ onClose, isLoading, data }) => {
    const { formik } = useEditLeaveTypeForm(data);

    const handleFormSubmit = () => {

        formik.handleSubmit();

        if (formik.isValid) {
            formik({
                leaveName: true,
                leaveTotal: true,
                leaveDescription: true,
                isCarryForward: false,
            });
            onClose(); // Close the modal
        } else {
            toast.error('Please make sure you have filled the form correctly');
        }
    };

    return (
        !isLoading && (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id='leaveName'
                        name='leaveName'
                        label='Leave Name'
                        placeholder='Enter leave name'
                        fullWidth
                        value={formik.values.leaveName}
                        onChange={formik.handleChange}
                        error={formik.touched.leaveName && Boolean(formik.errors.leaveName)}
                        helperText={formik.touched.leaveName && formik.errors.leaveName}
                        variant='outlined'
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id='leaveTotal'
                        name='leaveTotal'
                        label='Total Leave Days'
                        placeholder='Enter total leave days'
                        fullWidth
                        value={formik.values.leaveTotal}
                        onChange={formik.handleChange}
                        error={formik.touched.leaveTotal && Boolean(formik.errors.leaveTotal)}
                        helperText={formik.touched.leaveTotal && formik.errors.leaveTotal}
                        variant='outlined'
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id='leaveDescription'
                        name='leaveDescription'
                        label='Description'
                        placeholder='Enter leave description'
                        fullWidth
                        value={formik.values.leaveDescription}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.leaveDescription &&
                            Boolean(formik.errors.leaveDescription)
                        }
                        helperText={
                            formik.touched.leaveDescription && formik.errors.leaveDescription
                        }
                        variant='outlined'
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormControlLabel
                        required
                        control={<ThemeSwitch
                            checked={formik.values.isCarryForward} // Set the checked value based on formik's values
                            onChange={formik.handleChange} // Handle the change event
                            name="isCarryForward"
                        />}
                        label='Carry Forward'
                        id='isCarryForward'
                        name='isCarryForward'
                        value={formik.values.isCarryForward}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.isCarryForward && Boolean(formik.errors.isCarryForward)
                        }
                        helperText={formik.touched.isCarryForward && formik.errors.isCarryForward}
                    />
                </Grid>

                <Grid
                    container
                    direction='row'
                    justifyContent='flex-end'
                    alignItems='flex-end'
                >
                    <Button variant='contained' onClick={onClose} sx={{ mt: 3, ml: 1 }} color='error'>
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleFormSubmit}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Update Leave Type
                    </Button>
                </Grid>
            </Grid>
        )
    );
};

export default EditLeaveTypeFields;
