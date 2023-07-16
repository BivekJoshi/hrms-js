import { Grid, TextField, Button, MenuItem } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import useEditTodoListForm from "../../../hooks/todoList/editTodoList/useEditTodoListForm";

const priority = [
	{
		value: 'LOW',
		label: 'Low',
	},
	{
		value: 'MEDIUM',
		label: 'Medium',
	}, {
		value: 'HIGH ',
		label: 'High',
	}
];
const status = [
	{
		value: 'WORK_IN_PROGRESS',
		label: 'Work in Progress',
	},
	{
		value: 'COMPLETED',
		label: 'Completed',
	},
	{
		value: 'DELAYED ',
		label: 'Delayed',
	},
	{
		value: 'PENDING ',
		label: 'Pending',
	}
];

const EditTodoListFields = ({ onClose, isLoading, data }) => {

	const { formik } = useEditTodoListForm(data);
	
	const handleFormSubmit = () => {
		formik.handleSubmit();

		if (formik.isValid) {
			formik.setTouched({
				message: true,
				dueDate: true,
				priority: true,
			});
			onClose();
		} else {
			toast.error("Please make sure you have filled the message correctly")
		}
	};

	return (
		!isLoading && (
			<Grid container spacing={3}>
				<Grid item xs={10} sm={10}>
					<TextField
						id='message'
						name='message'
						label='message'
						placeholder='Enter Message...'
						fullWidth
						value={formik.values.message}
						onChange={formik.handleChange}
						error={
							formik.touched.message &&
							Boolean(formik.errors.message)
						}
						helperText={
							formik.touched.message && formik.errors.message
						}
						variant='outlined'
						autoFocus
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>
				                <Grid item xs={10} sm={10}>
                    <TextField
                        id='dueDate'
                        name='dueDate'
                        label='Due'
                        type='date'
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={formik.values.dueDate}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.dueDate && Boolean(formik.errors.dueDate)
                        }
                        helperText={formik.touched.dueDate && formik.errors.dueDate}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id='priority'
                        name='priority'
                        select
                        label='priority'
                        placeholder='Select your priority'
                        fullWidth
                        value={formik.values.priority}
                        onChange={formik.handleChange}
                        error={formik.touched.priority && Boolean(formik.errors.priority)}
                        helperText={formik.touched.priority && formik.errors.priority}
                        variant='outlined'
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    >
                        {priority.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <TextField
                        id='status'
                        name='status'
                        select
                        label='status'
                        placeholder='Select your status'
                        fullWidth
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        error={formik.touched.status && Boolean(formik.errors.status)}
                        helperText={formik.touched.status && formik.errors.status}
                        variant='outlined'
                        autoFocus
                        InputLabelProps={{ shrink: true }}
                    >
                        {status.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid> */}

				<Grid
					container
					direction='row'
					justifyContent='flex-end'
					alignItems='flex-end'
				>
					<Button variant='contained' onClick={onClose} sx={{ mt: 3, ml: 1 }} color='error'>
						Cancel
					</Button>
					<Button
						variant='contained'
						onClick={handleFormSubmit}
						sx={{ mt: 3, ml: 1 }}
					>
						Update Message
					</Button>
				</Grid>

			</Grid>
		)
	);
};

export default EditTodoListFields;