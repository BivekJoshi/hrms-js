import { Grid, TextField, Button } from '@mui/material'
import React from 'react'
import useAddDepartmentForm from '../../../hooks/department/addDepartment/useAddDepartmentForm';
import { toast } from 'react-toastify';


const DepartmentForm = ({ onClose }) => {
    const { formik } = useAddDepartmentForm();

    const handleOK = () => {
        formik.setFieldTouched('');
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <TextField
                    id='departmentName'
                    name='departmentName'
                    label='departmentName'
                    placeholder='Enter your departmentName'
                    fullWidth
                    value={formik.values.departmentName}
                    onChange={formik.handleChange}
                    error={formik.touched.departmentName && Boolean(formik.errors.departmentName)}
                    helperText={formik.touched.departmentName && formik.errors.departmentName}
                    variant='outlined'
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    id='departmentType'
                    name='departmentType'
                    label='departmentType'
                    placeholder='Enter your departmentType'
                    fullWidth
                    value={formik.values.departmentType}
                    onChange={formik.handleChange}
                    error={formik.touched.departmentType && Boolean(formik.errors.departmentType)}
                    helperText={formik.touched.departmentType && formik.errors.departmentType}
                    variant='outlined'
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    id='departmentDescription'
                    name='departmentDescription'
                    label='departmentDescription'
                    placeholder='Enter your departmentDescription'
                    fullWidth
                    value={formik.values.departmentDescription}
                    onChange={formik.handleChange}
                    error={formik.touched.departmentDescription && Boolean(formik.errors.departmentDescription)}
                    helperText={formik.touched.departmentDescription && formik.errors.departmentDescription}
                    variant='outlined'
                    autoFocus
                    InputLabelProps={{ shrink: true }}
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
                Add Department
            </Button>
        </Grid>
    )
}

export default DepartmentForm