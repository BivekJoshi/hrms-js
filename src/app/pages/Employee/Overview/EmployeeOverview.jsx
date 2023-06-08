import React from 'react';
import { Button, Box, Avatar, Container } from '@mui/material';

const EmployeeOverview = () => {
	return (
		<>
			<Container maxWidth='sm' sx={{ marginLeft: '0', paddingLeft: '0' }}>
				<Box
					sx={{
						bgcolor: '#cfe8fc',
						height: '100vh',
						display: 'flex',
						flexDirection: 'column',
						gap: '40px',
					}}
				>
					<Button
						size='large'
						sx={{ bgcolor: '#1c7ed6', maxWidth: '100px' }}
						variant='contained'
					>
						Back
					</Button>
					<div className='name-details'>
						<Avatar
							sx={{ width: 126, height: 126 }}
							variant='square'
							src='/broken-image.jpg'
						/>
						{/* <Text>Dhiraj Raj Joshi</Text> */}
					</div>
				</Box>
			</Container>
		</>
	);
};

export default EmployeeOverview;
