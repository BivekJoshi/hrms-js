import { Grid, Button, Typography } from '@mui/material';
import { EditIcon } from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const ListItemsTodo = ({ items, removeItem, editItem }) => {
	console.log(items);
	return (
		<>
			{items.length > 0 &&
				items.map((item) => {
					const { id, title } = item;
					return (
						<Grid key={id}>
							<Grid item xs={10}>
								<Typography fw={500} c='blue'>
									{title}
								</Typography>
							</Grid>
							<Grid item xs={1}>
								<Button type='button' onClick={() => editItem(id)}>
									<EditIcon />
								</Button>
							</Grid>
							<Grid item xs={1}>
								<Button type='button' onClick={() => removeItem(id)}>
									<DeleteIcon />
								</Button>
							</Grid>
						</Grid>
					);
				})}
		</>
	);
};

export default ListItemsTodo;
