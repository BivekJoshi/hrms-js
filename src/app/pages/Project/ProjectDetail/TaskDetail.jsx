import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <>
            <Typography variant='h4' >Task Details</Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={12}>
                    <TextField 
                     id="NewTask"
                     name="NewTask"
                     label="New Task"
                     placeholder="Enter task name..."
                     fullWidth
                     value={Formik.values.name}
                     onChange={Formik.handleChange}
                     error={formik.touched.name && Boolean(formik.errors.name)}
                     helperText={formik.touched.name && formik.errors.name}
                     variant="outlined"
                     autoFocus
                     InputLabelProps={{ shrink: true }}
                    ></TextField>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField 
                     id="Details"
                     name="Details"
                     label="Task Details"
                     placeholder="Enter task Details..."
                     fullWidth
                     value={Formik.values.detail}
                     onChange={Formik.handleChange}
                     error={formik.touched.detail && Boolean(formik.errors.detail)}
                     helperText={formik.touched.detail && formik.errors.detail}
                     variant="outlined"
                     autoFocus
                     InputLabelProps={{ shrink: true }}
                    ></TextField>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField 
                     id="Status"
                     name="Status"
                     label="Task Status"
                     placeholder="Enter task Status..."
                     fullWidth
                     value={Formik.values.status}
                     onChange={Formik.handleChange}
                     error={formik.touched.status && Boolean(formik.errors.status)}
                     helperText={formik.touched.status && formik.errors.status}
                     variant="outlined"
                     autoFocus
                     InputLabelProps={{ shrink: true }}
                    ></TextField>
                </Grid>

            </Grid>
        </>
    );
};

export default TaskDetail;