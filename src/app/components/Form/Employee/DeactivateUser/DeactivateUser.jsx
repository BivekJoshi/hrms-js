import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useActivateUser } from '../../../../hooks/employee/DeactivateEmploye/useEmployee';
import { useDeactiveUser } from '../../../../hooks/user/useDeactiveUser';

const DeactivateUser = ({ onClose, id }) => {
  const { formik } = useDeactiveUser(onClose, id);
  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h6' component='h6'>
            Do you really want to Activate user
          </Typography>
        </Grid>

        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <Button
            variant='contained'
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Yes Proceed
          </Button>
          <Button
            variant='contained'
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color='error'
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeactivateUser;
