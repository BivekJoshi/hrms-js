import { Grid, TextField, Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import useAddDepartmentForm from '../../../hooks/designation/addDesignation/useAddDesignationForm';

const DesignationForm = ({ onClose }) => {
	const { formik } = useAddDepartmentForm();

	const handleOK = () => {
		formik.setFieldTouched('');
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={12}>
				<TextField
					id='positionName'
					name='positionName'
					label='position Name'
					placeholder='Enter your positionName'
					fullWidth
					value={formik.values.positionName}
					onChange={formik.handleChange}
					error={
						formik.touched.positionName && Boolean(formik.errors.positionName)
					}
					helperText={formik.touched.positionName && formik.errors.positionName}
					variant='outlined'
					autoFocus
					InputLabelProps={{ shrink: true }}
				/>
			</Grid>
			<Grid item xs={12} sm={12}>
				<TextField
					id='positionLevel'
					name='positionLevel'
					label='position Level'
					placeholder='Enter your positionLevel'
					fullWidth
					value={formik.values.positionLevel}
					onChange={formik.handleChange}
					error={
						formik.touched.positionLevel && Boolean(formik.errors.positionLevel)
					}
					helperText={
						formik.touched.positionLevel && formik.errors.positionLevel
					}
					variant='outlined'
					autoFocus
					InputLabelProps={{ shrink: true }}
				/>
			</Grid>
			<Grid item xs={12} sm={12}>
				<TextField
					id='salary'
					name='salary'
					label='salary'
					placeholder='Enter your salary'
					fullWidth
					value={formik.values.salary}
					onChange={formik.handleChange}
					error={formik.touched.salary && Boolean(formik.errors.salary)}
					helperText={formik.touched.salary && formik.errors.salary}
					variant='outlined'
					autoFocus
					InputLabelProps={{ shrink: true }}
				/>
			</Grid>
			<Grid item xs={12} sm={12}>
				<TextField
					id='positionDetails'
					name='positionDetails'
					label='position Details'
					placeholder='Enter your positionDetails'
					fullWidth
					value={formik.values.positionDetails}
					onChange={formik.handleChange}
					error={
						formik.touched.positionDetails &&
						Boolean(formik.errors.positionDetails)
					}
					helperText={
						formik.touched.positionDetails && formik.errors.positionDetails
					}
					variant='outlined'
					autoFocus
					InputLabelProps={{ shrink: true }}
				/>
			</Grid>
			<Button variant='contained' onClick={onClose} sx={{ mt: 3, ml: 1 }}>
				Cancel
			</Button>
			<Button
				variant='contained'
				onClick={() => {
					formik.handleSubmit();
					// onClose;
					formik.isValid
						? handleOK()
						: toast.error(
								'Please make sure you have filled the form correctly'
						  );
				}}
				sx={{ mt: 3, ml: 1 }}
			>
				Add Department
			</Button>
		</Grid>
	);
};

export default DesignationForm;
