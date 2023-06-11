import React from 'react';
import DashboardCard from '../../components/cards/Dashboard/DashboardCard';
import { Grid, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Dashboard = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <DashboardCard title="Users" count="236" icon="PersonIcon"/>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <DashboardCard title="Employee" count="250" />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <DashboardCard title="Event" count="800" />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <DashboardCard title="Holiday" count="078" />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <DashboardCard title="Holiday" count="078" />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
