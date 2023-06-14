import React from 'react';

const BasicInfo = () => {
	return (
		<div>
			<Box
				className='profileBasic'
				sx={{
					width: 400,
					height: 700,
					bgcolor: '#cfe8fc',
					borderRadius: 5,
				}}
			>
				<Avatar
					sx={{ width: 200, height: 200, bgcolor: primaryColor }}
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
						Dhiraj Raj Joshi
					</Typography>
					<Chip label='Back-End Intern' />
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<Typography>Date of Join:</Typography>
					<Typography>Jan 14, 2023</Typography>
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
								<CallIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Contact Number' secondary='9865324578' />
					</ListItem>
					<Divider variant='inset' component='li' />
					<ListItem>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: primaryColor }}>
								<EmailIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Email' secondary='dhiraj.joshi@dghub.io' />
					</ListItem>
					<Divider variant='inset' component='li' />
					<ListItem>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: primaryColor }}>
								<HomeIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Address' secondary='Kalanki, Kathmandu' />
					</ListItem>
				</List>
			</Box>
		</div>
	);
};

export default BasicInfo;
