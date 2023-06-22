import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EmailIcon from '@mui/icons-material/Email';
import Divider from '@mui/material/Divider';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { ListItemAvatar, Chip, Box, Avatar, Typography } from '@mui/material';

const primaryColor = '#1c7ed6';

const LeftProfile = ({ data }) => {
	// console.log(data);
	const MiddleName = data?.middleName === null ? ' ' : data?.middleName;

	return (
		<div>
			<Box
				className='profileBasic'
				sx={{
					width: 400,
					height: 600,
					bgcolor: '#cfe8fc',
					borderRadius: 5,
				}}
			>
				<Avatar
					sx={{
						width: 200,
						height: 200,
						bgcolor: primaryColor,
						alignSelf: 'center',
					}}
					variant='circle'
					src='/broken-image.jpg'
				/>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography
						style={{
							color: primaryColor,
							fontSize: 'larger',
							fontWeight: 'bolder',
						}}
					>
						{data?.firstName + ' ' + MiddleName + ' ' + data?.lastName}
					</Typography>
					<Chip label={data?.position.positionName} />
				</div>

				<List
					sx={{
						width: '100%',
						maxWidth: 360,
						bgcolor: 'background.paper',
						borderRadius: 5,
					}}
				>
					<ListItem>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: primaryColor }}>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Employee ID' secondary={data?.id} />
					</ListItem>
					<Divider variant='inset' component='li' />
					<ListItem>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: primaryColor }}>
								<EmailIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Email' secondary={data?.officeEmail} />
					</ListItem>
					<Divider variant='inset' component='li' />
					<ListItem>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: primaryColor }}>
								<CalendarMonthIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Date of Join' secondary={data?.dateOfJoin} />
					</ListItem>
				</List>
			</Box>
		</div>
	);
};

export default LeftProfile;
