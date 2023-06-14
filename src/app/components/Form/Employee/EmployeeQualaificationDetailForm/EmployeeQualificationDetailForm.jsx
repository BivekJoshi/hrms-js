import { Grid, TextField, Button } from '@mui/material';
import React, { useState } from 'react';

const EmployeeQualifiactionDetailForm = ({ formik, isLoading }) => {
  const [fieldCount, setFieldCount] = useState(1);

  const handleAddField = () => {
    setFieldCount(prevCount => prevCount + 1);
  };

  return (
    !isLoading && (
      <>
        <Grid container spacing={3}>
          {Array.from({ length: fieldCount }).map((index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id={`board-${index}`}
                  name={`board-${index}`}
                  label='Board'
                  placeholder='Enter your board'
                  fullWidth
                  value={formik.values[`board-${index}`]}
                  onChange={formik.handleChange}
                  error={formik.touched[`board-${index}`] && Boolean(formik.errors[`board-${index}`])}
                  helperText={formik.touched[`board-${index}`] && formik.errors[`board-${index}`]}
                  variant='outlined'
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id={`institute-${index}`}
                  name={`institute-${index}`}
                  label='Institute'
                  placeholder='Enter your institute'
                  fullWidth
                  value={formik.values[`institute-${index}`]}
                  onChange={formik.handleChange}
                  error={formik.touched[`institute-${index}`] && Boolean(formik.errors[`institute-${index}`])}
                  helperText={formik.touched[`institute-${index}`] && formik.errors[`institute-${index}`]}
                  variant='outlined'
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id={`passedLevel-${index}`}
                  name={`passedLevel-${index}`}
                  label='passedLevel'
                  placeholder='Enter your passedLevel'
                  fullWidth
                  value={formik.values[`passedLevel-${index}`]}
                  onChange={formik.handleChange}
                  error={formik.touched[`passedLevel-${index}`] && Boolean(formik.errors[`passedLevel-${index}`])}
                  helperText={formik.touched[`passedLevel-${index}`] && formik.errors[`passedLevel-${index}`]}
                  variant='outlined'
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id={`passedYear-${index}`}
                  name={`passedYear-${index}`}
                  label='passedYear'
                  placeholder='Enter your passedYear'
                  fullWidth
                  value={formik.values[`passedYear-${index}`]}
                  onChange={formik.handleChange}
                  error={formik.touched[`passedYear-${index}`] && Boolean(formik.errors[`passedYear-${index}`])}
                  helperText={formik.touched[`passedYear-${index}`] && formik.errors[`passedYear-${index}`]}
                  variant='outlined'
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id={`grade-${index}`}
                  name={`grade-${index}`}
                  label='grade'
                  placeholder='Enter your grade'
                  fullWidth
                  value={formik.values[`grade-${index}`]}
                  onChange={formik.handleChange}
                  error={formik.touched[`grade-${index}`] && Boolean(formik.errors[`grade-${index}`])}
                  helperText={formik.touched[`grade-${index}`] && formik.errors[`grade-${index}`]}
                  variant='outlined'
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

            </React.Fragment>
          ))}
        </Grid>
        <Button variant="contained" onClick={handleAddField}>Add Field</Button>
      </>
    )
  );
};

export default EmployeeQualifiactionDetailForm;
