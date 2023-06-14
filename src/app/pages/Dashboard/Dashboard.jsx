import React from 'react';
import DashboardCard from '../../components/cards/Dashboard/DashboardCard';
import { Grid, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Dashboard = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} style={{display:'flex', justifyContent:'space-around' }}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <DashboardCard title="Users" icon={<PersonIcon/>}/>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <DashboardCard title="Employee" icon={<CalendarMonthIcon/>}/>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <DashboardCard title="Event" icon={<CalendarMonthIcon/>}/>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <DashboardCard title="Holiday" icon={<CalendarMonthIcon/>}/>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <DashboardCard title="Holiday" icon={<CalendarMonthIcon/>}/>
      </Grid>
    </Grid>
 );
};

export default Dashboard;
