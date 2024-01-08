import React, { useContext } from 'react';
import { Grid, TextField, Button, MenuItem } from '@mui/material';
import useTodoListForm from '../../../hooks/todoList/TodoListForm/useTodoListForm';
import ThemeModeContext from '../../../../theme/ThemeModeContext';
import { ButtonComponent } from '../../Button/ButtonComponent';

const priority = [
  {
    value: 'LOW',
    label: 'Low',
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
  },
  {
    value: 'HIGH',
    label: 'High',
  },
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
  },
];
const TodoListFields = ({ onClose, isLoading, data }) => {
  const { formik } = useTodoListForm(data, onClose);
  const { mode } = useContext(ThemeModeContext);

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const submitButtonText = data ? 'Update Message' : 'Add Message';
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='message'
            name='message'
            label='Message'
            placeholder='Enter your message...'
            fullWidth
            required
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='dueDate'
            name='dueDate'
            label='Due'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
            inputProps={{ min: currentDate }}
            required
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
            helperText={formik.touched.dueDate && formik.errors.dueDate}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            id='priority'
            name='priority'
            select
            label='Priority'
            placeholder='Select your priority'
            fullWidth
            required
            value={formik.values.priority}
            onChange={formik.handleChange}
            error={formik.touched.priority && Boolean(formik.errors.priority)}
            helperText={formik.touched.priority && formik.errors.priority}
            variant='outlined'
            InputLabelProps={{ shrink: true }}
          >
            {priority &&
              priority.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}
                >
                  {option.label}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-end'
          gap={1}
          mt={2}
        >
          <ButtonComponent
            variant='contained'
            OnClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1, color: '#fff' }}
            color={"#fff"}
            buttonName={submitButtonText}
          />
          <ButtonComponent
            variant='contained'
            OnClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color={"#fff"}
            BGColor={'#d32f2f'}
            buttonName={'Cancel'}
          />
        </Grid>
      </Grid>
    )
  );
};

export default TodoListFields;
