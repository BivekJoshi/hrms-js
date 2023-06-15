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
			<Grid item xs={12} sx={{ mb: -2.25 }}>
				<Typography variant='h5'>Dashboard</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={3} lg={2}>
				<DashboardCard title='Users' icon={<PersonIcon fontSize='large' />} />
			</Grid>
			<Grid item xs={12} sm={6} md={3} lg={2}>
				<DashboardCard title='Employees' icon={<PeopleAltIcon fontSize='large' />} />
			</Grid>
			<Grid item xs={12} sm={6} md={3} lg={2}>
				<DashboardCard title='Events' icon={<CalendarMonthIcon fontSize='large' />} />
			</Grid>
			<Grid item xs={12} sm={6} md={3} lg={2}>
				<DashboardCard title='Holiday' icon={<CalendarMonthIcon fontSize='large' />} />
			</Grid>
			<Grid item xs={12} sm={6} md={3} lg={2}>
				<DashboardCard title='Holiday' icon={<CalendarMonthIcon fontSize='large' />} />
			</Grid>
		</Grid>
		<br/>
		<EmployeeCount/>
		</>
	);
};

export default Dashboard;
