import React, { useContext } from 'react';
import { Grid, TextField, Button, MenuItem } from '@mui/material';
import useProjectTaskForm from '../../../../hooks/project/ProjectTask/ProjectTaskForm/useProjectTaskForm';
import ThemeModeContext from '../../../../../theme/ThemeModeContext';
import { useGetProject } from '../../../../hooks/project/useProject';
import { useParams } from 'react-router-dom';

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
    value: 'HIGH ',
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

const ProjectTaskField = ({ onClose, isLoading, data }) => {
  const { formik } = useProjectTaskForm(data, onClose);
  const { mode } = useContext(ThemeModeContext);
  const { id } = useParams();

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };
  const currentDate = new Date().toISOString().split('T')[0];

  const { data: projectData, isLoading: loadingProject } = useGetProject();
  const submitButtonText = data ? 'Update Task' : 'Add Task';

  const ProjectNameField = id ? null : (
    <Grid item xs={12} sm={12}>
      <TextField
        id='projectId'
        name='projectId'
        label='Project Name'
        placeholder='Enter your message...'
        fullWidth
        select
        required
        value={formik.values.projectId}
        onChange={formik.handleChange}
        error={formik.touched.projectId && Boolean(formik.errors.projectId)}
        helperText={formik.touched.projectId && formik.errors.projectId}
        variant='standard'
        InputLabelProps={{ shrink: true }}
      >
        {!loadingProject &&
          projectData.map((option) => (
            <MenuItem
              key={option?.id}
              value={option?.id}
              sx={{ bgcolor: mode === 'light' ? '' : '#413e3e' }}
            >
              {option?.projectName}
            </MenuItem>
          ))}
      </TextField>
    </Grid>
  );
  return (
    !isLoading && (
      <Grid container spacing={3}>
        {ProjectNameField}

        <Grid item xs={12} sm={12}>
          <TextField
            id='name'
            name='name'
            label='Task'
            placeholder='Enter task message...'
            fullWidth
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant='standard'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='detail'
            name='detail'
            label='Detail'
            placeholder='Enter task details'
            fullWidth
            required
            multiline
            value={formik.values.detail}
            onChange={formik.handleChange}
            error={formik.touched.detail && Boolean(formik.errors.detail)}
            helperText={formik.touched.detail && formik.errors.detail}
            variant='standard'
            InputLabelProps={{ shrink: true }}
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
            variant='standard'
            InputLabelProps={{ shrink: true }}
          >
            {priority.map((option) => (
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
        <Grid item xs={12} sm={12}>
          <TextField
            id='status'
            name='status'
            select
            label='Status'
            placeholder='Select your status'
            fullWidth
            required
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            variant='standard'
            InputLabelProps={{ shrink: true }}
          >
            {status.map((option) => (
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
        <Grid item xs={12} sm={12}>
          <TextField
            id='dueDate'
            name='dueDate'
            label='Due'
            type='date'
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
            helperText={formik.touched.dueDate && formik.errors.dueDate}
            inputProps={{
              min: currentDate, // Disable past date selections
            }}
          />
        </Grid>

        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <Button
            variant='contained'
            onClick={handleFormSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            {submitButtonText}
          </Button>
          <Button
            variant='contained'
            onClick={onClose}
            sx={{ mt: 3, ml: 1 }}
            color='error'
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default ProjectTaskField;
