import { Divider, Grid, ListItem, ListItemText } from '@mui/material';
import React from 'react';

const InfoItem = ({ field, value }) => {
	return (
		<div>
			<ListItem>
				<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					<Grid item xs={6}>
						<ListItemText primary={field + ' : '} />
					</Grid>
					<Grid item xs={6}>
						<ListItemText primary={value} />
					</Grid>
					<Divider component='li' />
				</Grid>
			</ListItem>
			<Divider component='li' />
		</div>
	);
};

export default InfoItem;
