import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import useAddTodoListForm from '../../../hooks/todoList/addTodoList/useAddTodoListForm';

const AddTodoListFields = ({ onClose, isLoading }) => {
    const { formik } = useAddTodoListForm();

    const handleFormSubmit = () => {
        formik.handleSubmit();

        if(formik.isValid) {
            formik.setTouched({
                message: true,
            });
            onClose();
        } else{
            toast.error("Please make sure you have filled the form correctly")
        }
    };


    return (
        !isLoading && (
            <Grid container spacing={3}>
                <Grid item xs={10} sm={10}>
                    <TextField
                        id='message'
                        name="message"
                        label="message"
                        placeholder='Enter your message...'
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
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button variant="contained" onClick={onClose} sx={{ mt: 3, ml: 1 }} color='error'>
                        Cancel
                    </Button>
                    <Button
                        variant="contained" 
                        onClick={handleFormSubmit}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Add Message
                    </Button>
                </Grid>
            </Grid>
        )
    );
};

export default AddTodoListFields;