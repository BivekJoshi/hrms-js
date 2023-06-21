import { Grid, TextField, Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import useEditTodoListForm from "../../../hooks/todoList/editTodoList/useEditTodoListForm";

const EditTodoListFields = ({ onClose, isLoading, data }) => {
    const { formik } = useEditTodoListForm(data);
	 //console.log(data)
    const handleFormSubmit = () => {
        formik.handleSubmit();

        if(formik.isValid) {
            formik.setTouched({
                message: true,
            });
            onClose();
        } else{
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