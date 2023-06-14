import React from 'react';
import {
	Button,
	Box,
	Avatar,
	ListItemAvatar,
	Typography,
	Chip,
} from '@mui/material';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import Divider from '@mui/material/Divider';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import '../Overview/Overview.css';
import BasicInfo from './OverviewBody/BasicInfo';

const primaryColor = '#1c7ed6';

const Overview = () => {
	const [value, setValue] = React.useState('1');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<>
			<div className='header'>
				<Button
					size='large'
					sx={{ bgcolor: '#1c7ed6', maxWidth: '100px' }}
					variant='contained'
				>
					<KeyboardBackspaceIcon />
				</Button>
				<div className='avatarNname'>
					<Avatar
						alt='D'
						src='/static/images/avatar/1.jpg'
						sx={{ bgcolor: '#1c7ed6' }}
					/>
					<Typography
						style={{
							color: primaryColor,
							fontSize: 'larger',
							fontWeight: 'bolder',
						}}
					>
						Dhiraj Raj Joshi
					</Typography>
				</div>
			</div>

			<div className='employeeBody'>
				<BasicInfo />

				<Box sx={{ width: '90%', typography: 'body1' }}>
					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<TabList
								onChange={handleChange}
								aria-label='lab API tabs example'
							>
								<Tab label='Item One' value='1' />
								<Tab label='Item Two' value='2' />
								<Tab label='Item Three' value='3' />
							</TabList>
						</Box>
						<TabPanel value='1'>Item One</TabPanel>
						<TabPanel value='2'>Item Two</TabPanel>
						<TabPanel value='3'>Item Three</TabPanel>
					</TabContext>
				</Box>
			</div>
		</>
	);
};

export default Overview;
