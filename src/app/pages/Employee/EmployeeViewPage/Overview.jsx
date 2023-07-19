import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import './Style/EmployeeViewPage.css';
import LeftProfile from './LeftProfile';
import TabComponent from './InfoTabs/TabComponent';

const primaryColor = '#1c7ed6';

const Overview = ({ data, photo }) => {
	const navigate = useNavigate();
	const MiddleName = data?.middleName === null ? ' ' : data?.middleName;
	return (
		<>
			<div className='header'>
				<Button
					size='large'
					sx={{ bgcolor: '#1c7ed6' }}
					variant='contained'
					onClick={() => {
						navigate(-1);
					}}
				>
					<KeyboardBackspaceIcon />
				</Button>
				<div className='avatarNname'>
					<Avatar
						alt={data?.firstName[0]}
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
						{data?.firstName + ' ' + MiddleName + ' ' + data?.lastName}
					</Typography>
				</div>
			</div>

			<div className='employeeBody'>
				<LeftProfile data={data} photo={photo} />
				<TabComponent data={data} />
			</div>
		</>
	);
};

export default Overview;
