import React from 'react';
import DashboardCard from '../../components/cards/Dashboard/DashboardCard';
import { Grid, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmployeeCount from './DashboardTable/EmployeeCount';

const Dashboard = () => {
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <DashboardCard title="Users" icon={<PersonIcon fontSize="large" />} />
        <DashboardCard title="Employees" icon={<PeopleAltIcon fontSize="large" />} />
        <DashboardCard title="Events" icon={<CalendarMonthIcon fontSize="large" />} />
        <DashboardCard title="Holiday" icon={<CalendarMonthIcon fontSize="large" />} />
        <DashboardCard title="Project" icon={<CalendarMonthIcon fontSize="large" />} />
      </Grid>
      <br />
      <EmployeeCount />
    </>
  );
};

export default Dashboard;
