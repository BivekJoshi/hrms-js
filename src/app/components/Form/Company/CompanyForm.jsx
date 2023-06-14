import { Grid, TextField, Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import useAddCompanyForm from '../../../hooks/company/addCompany/useAddCompanyForm';

const CompanyForm = ({ onClose }) => {
	const { formik } = useAddCompanyForm();

	const handleOK = () => {
		formik.setFieldTouched('');
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={12}>
				<TextField
					id='companyName'
					name='companyName'
					label='company Name'
					placeholder='Enter your companyName'
					fullWidth
					value={formik.values.companyName}
					onChange={formik.handleChange}
					error={
						formik.touched.companyName && Boolean(formik.errors.companyName)
					}
					helperText={formik.touched.companyName && formik.errors.companyName}
					variant='outlined'
					autoFocus
					InputLabelProps={{ shrink: true }}
				/>
			</Grid>
			<Grid item xs={12} sm={12}>
				<TextField
					id='companyType'
					name='companyType'
					label='company Type'
					placeholder='Enter your companyType'
					fullWidth
					value={formik.values.companyType}
					onChange={formik.handleChange}
					error={
						formik.touched.companyType && Boolean(formik.errors.companyType)
					}
					helperText={formik.touched.companyType && formik.errors.companyType}
					variant='outlined'
					autoFocus
					InputLabelProps={{ shrink: true }}
				/>
			</Grid>
			<Grid item xs={12} sm={12}>
				<TextField
					id='companyDescription'
					name='companyDescription'
					label='company Description'
					placeholder='Enter your companyDescription'
					fullWidth
					value={formik.values.companyDescription}
					onChange={formik.handleChange}
					error={
						formik.touched.companyDescription &&
						Boolean(formik.errors.companyDescription)
					}
					helperText={
						formik.touched.companyDescription &&
						formik.errors.companyDescription
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

export default CompanyForm;
