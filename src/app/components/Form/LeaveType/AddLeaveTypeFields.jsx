import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import useAddLeaveTypeForm from '../../../hooks/leaveType/addLeaveType/useAddLeaveTypeForm';
import { ThemeSwitch } from '../../../../theme/ThemeSwitch';


const LEAVENAME = [
  {
    value: 'CASUAL',
    label: 'Casual Leave',
  },
  {
    value: 'SICK',
    label: 'Sick Leave',
  },
  {
    value: 'ANNUAL',
    label: 'Annual Leave',
  },
  {
    value: 'FESTIVAL',
    label: 'Festival Leave',
  },
  {
    value: 'MARRIAGE',
    label: 'Marriage Leave',
  },
  {
    value: 'MATERNITY',
    label: 'Maternity Leave',
  },
  {
    value: 'MATERNITY_ADDITIONAL',
    label: 'Maternity leave Additional',
  },
  {
    value: 'PATERNITY',
    label: 'Paternity Leave',
  },
  {
    value: 'BEREAVEMENT',
    label: 'Bereavement Leave',
  },
  {
    value: 'UNPAID',
    label: 'Unpaid Leave',
  },
];

const AddLeaveTypeFields = ({ onClose, isLoading, existingLeaveTypes }) => {
  const { formik } = useAddLeaveTypeForm(onClose);

  const handleFormSubmit = () => {
    formik.handleSubmit();

    if (formik.isValid) {
      onClose();
    } else {
      toast.error('Please make sure you have filled the form correctly');
    }
  };

  {/*Filter the leave names that are not already existing in the table*/ }

  const FILTEREDLEAVENAMES = LEAVENAME.filter(
    (option) => !existingLeaveTypes.includes(option.value)
  );

  return (
    !isLoading && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id='leaveName'
            name='leaveName'
            select
            label='Leave Type'
            placeholder='Select your leaveName'
            fullWidth
            value={formik.values.leaveName}
            onChange={formik.handleChange}
            error={formik.touched.leaveName && Boolean(formik.errors.leaveName)}
            helperText={formik.touched.leaveName && formik.errors.leaveName}
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          >
            {FILTEREDLEAVENAMES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='leaveTotal'
            name='leaveTotal'
            label='Total Leave Days'
            placeholder='Enter total leave days'
            fullWidth
            value={formik.values.leaveTotal}
            onChange={formik.handleChange}
            error={formik.touched.leaveTotal && Boolean(formik.errors.leaveTotal)}
            helperText={formik.touched.leaveTotal && formik.errors.leaveTotal}
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id='leaveDescription'
            name='leaveDescription'
            label='Description'
            placeholder='Enter leave description'
            fullWidth
            value={formik.values.leaveDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.leaveDescription &&
              Boolean(formik.errors.leaveDescription)
            }
            helperText={
              formik.touched.leaveDescription && formik.errors.leaveDescription
            }
            variant='outlined'
            autoFocus
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            required
            control={<ThemeSwitch
              checked={formik.values.isCarryForward} // Set the checked value based on formik's values
              onChange={formik.handleChange} // Handle the change event
              name="isCarryForward"
            />}
            label='Carry Forward'
            id='isCarryForward'
            name='isCarryForward'
            value={formik.values.isCarryForward}
            onChange={formik.handleChange}
            error={
              formik.touched.isCarryForward && Boolean(formik.errors.isCarryForward)
            }
            helperText={formik.touched.isCarryForward && formik.errors.isCarryForward}
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
            onClose={onClose}
          >
            Add Leave Type
          </Button>
          <Button variant='contained' onClick={onClose} sx={{ mt: 3, ml: 1 }} color='error'>
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  );
};

export default AddLeaveTypeFields;
