import { Grid, TextField, Button, FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify';
import useAddLeaveTypeForm from '../../../hooks/leaveType/useAddLeaveTypeForm';
import { ThemeSwitch } from '../../../../theme/ThemeSwitch';


const LeaveTypeForm = ({ onClose }) => {
    const { formik } = useAddLeaveTypeForm();

    const handleOK = () => {
        formik.setFieldTouched('');
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <TextField
                    id='leaveName'
                    name='leaveName'
                    label='leaveName'
                    placeholder='Enter your leaveName'
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
                    label='leaveTotal'
                    placeholder='Enter your leaveTotal'
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
                    label='leaveDescription'
                    placeholder='Enter your leaveDescription'
                    fullWidth
                    value={formik.values.leaveDescription}
                    onChange={formik.handleChange}
                    error={formik.touched.leaveDescription && Boolean(formik.errors.leaveDescription)}
                    helperText={formik.touched.leaveDescription && formik.errors.leaveDescription}
                    variant='outlined'
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <FormControlLabel
                    required
                    control={<ThemeSwitch />}
                    label="Carry Forward"
                    id='carryForward'
                    name='carryForward'
                    value={formik.values.carryForward}
                    onChange={formik.handleChange}
                    error={formik.touched.carryForward && Boolean(formik.errors.carryForward)}
                    helperText={formik.touched.carryForward && formik.errors.carryForward}
                />
            </Grid>
            <Button
                variant='contained'
                onClick={onClose}
                sx={{ mt: 3, ml: 1 }}
            >
                Cancel
            </Button>
            <Button
                variant='contained'
                onClick={() => {
                    formik.handleSubmit();
                    // onClose;
                    formik.isValid
                        ? handleOK()
                        : toast.error(
                            'Please make sure you have filled the form correctly'
                        );
                }}
                sx={{ mt: 3, ml: 1 }}
            >
                Add Leave Type
            </Button>
        </Grid>
    )
}

export default LeaveTypeForm