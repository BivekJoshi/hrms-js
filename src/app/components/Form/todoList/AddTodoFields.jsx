import React from 'react';
import useAddTodoForm from './useAddTodoForm';
import { Grid, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

const AddTodoFields = ({ onClose, isLoading }) => {
    const { formik } = useAddTodoForm();

    const handleTodoSubmit = () => {
        formik.handleSubmit();

        if(formik.isValid) {
            formik.setTouched({
                todoMessage: true,
            });
            onClose();
        } else{
            toast.error("Please make sure you have filled the form correctly")
        }
    };


    return (
        !isLoading && (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id='todoMessage'
                        name="todoMessage"
                        label="todoMessage"
                        placeholder='Enter your message...'
                        fullWidth
                        value={formik.values.todoMessage}
                        onChange={formik.handChange}
                        error={
                            formik.touched.todoMessage && 
                            Boolean(formik.errors.todoMessage)
                        }
                        helperText={
							formik.touched.todoMessage && formik.errors.todoMessage
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
                        onClick={handleTodoSubmit}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Add Todo
                    </Button>
                </Grid>
            </Grid>
        )
    );
};

export default AddTodoFields;