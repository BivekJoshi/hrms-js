import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import MainCard from '../MainCard';

const DashboardCard = ({ title, icon }) => {
  return (
    <Grid item xs={12} sm={6} md={3} lg={2}>

      <MainCard grow={true} >
        <Stack spacing={0.5} padding="1rem 0">
          <Typography variant="h6" color="primary.main" align='center'>
            {icon}
          </Typography>
          <Typography variant="h6" color="inherit" align='center'>
            {title}
          </Typography>
        </Stack>
      </MainCard>
      </Grid>

      );
};

      export default DashboardCard;
