import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import ListItemsTodo from './ListItemsTodo';
const TodoList = () => {
	const [name, setName] = useState('');
	const [dolist, setDoList] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState(null);
	console.log(dolist, isEditing, name);
	const handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem('dolist', JSON.stringify(data));
		if (name && isEditing) {
			setDoList(
				dolist.map((item) => {
					if (item.id === editID) {
						return { ...item, title: name };
					}
					return item;
				})
			);
			setName('');
			setEditID(null);
			setIsEditing(false);
		} else {
			const newItem = { id: new Date().getTime().toString(), title: name };
			setDoList([...dolist, newItem]);
			setName('');
		}
	};

	const clearList = () => {
		setDoList([]);
	};

	const removeItem = (id) => {
		setDoList(dolist.filter((item) => item.id !== id));
	};

	const editItem = (id) => {
		const specificItem = dolist.find((item) => item.id === id);
		setIsEditing(true);
		setEditID(id);
		setName(specificItem.title);
	};

	return (
		<div style={{ padding: '2rem 2rem' }}>
			<form onSubmit={handleSubmit}>
				<Typography>To Do List</Typography>
				<Grid container spacing={7}>
					<Grid item xs={9}>
						<TextField
							id='outlined-basic'
							label='Todays Goal'
							variant='outlined'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid>

					<Grid item xs={3}>
						<Button variant='contained' type='submit'>
							{isEditing ? 'Edit' : '+Add'}
						</Button>
					</Grid>
				</Grid>
			</form>
			{dolist && dolist.length > 0 && (
				<div>
					<ListItemsTodo
						items={dolist}
						removeItem={removeItem}
						editItem={editItem}
					/>

					<Button variant='contained' onClick={clearList}>
						Clear List
					</Button>
				</div>
			)}
		</div>
	);
};

export default TodoList;
