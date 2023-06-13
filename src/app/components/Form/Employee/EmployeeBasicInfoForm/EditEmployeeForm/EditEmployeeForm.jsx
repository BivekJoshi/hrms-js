import {
	Box,
	Button,
	Container,
	Paper,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import EmployeeBasicInfoForm from '../EmployeeBasicInfoForm';
import useEditEmployeeForm from '../../../../../hooks/employee/EditEmployee/useEditEmployeeForm';
import Modal from '@mui/material/Modal';
import EmployeeEducationDetailForm from '../../EmployeeEducationDetailForm/EmployeeEducationDetailForm';

const steps = [
	'Basic Details',
	'Educational Details',
	'Address Details',
	'Other Details',
];
const EditEmployeeForm = () => {
	const [activeStep, setActiveStep] = useState(0);
	const { formik, isLoading } = useEditEmployeeForm();

	const handleNext = () => {
		switch (activeStep) {
			case 0:
				formik.setFieldTouched('');
				break;
			case 1:

			default:
				break;
		}
		setActiveStep(activeStep + 1);
	};

	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return <EmployeeBasicInfoForm formik={formik} isLoading={isLoading} />;

			case 1:
				return <EmployeeEducationDetailForm />;

			default:
				throw new Error('Unknown Step');
		}
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handleReturn = () => {
		setActiveStep(0);
	};

	return (
		<Container component='main' maxWidth='xlg' sx={{ mt: 5 }}>
			<Paper variant='plain' sx={{ my: { xs: 0, md: 6 }, p: { xs: 0, md: 3 } }}>
				<Typography component='h1' varient='h4' align='center'>
					Edit Employee
				</Typography>
				<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<React.Fragment>
					{activeStep === steps.length ? (
						<React.Fragment>
							<Typography variant='h5' gutterBottom>
								Employee added successfully
							</Typography>
							<Typography variant='subtitle1'>SuccessFul.</Typography>
							<Button onClick={handleReturn} sx={{ mt: 3, ml: 1 }}>
								Return
							</Button>
						</React.Fragment>
					) : (
						<React.Fragment>
							{getStepContent(activeStep)}
							<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								{activeStep !== 0 && (
									<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
										Back
									</Button>
								)}
								{activeStep === steps.length - 1 ? (
									<Button
										variant='contained'
										onClick={() => {
											formik.handleSubmit();
											formik.isValid
												? null
												: toast.error(
														'Please make sure you have filled the form correctly'
												  );
										}}
										sx={{ mt: 3, ml: 1 }}
									>
										Add Employee
									</Button>
								) : (
									<Button
										variant='contained'
										onClick={() => {
											formik.handleSubmit();
											handleNext;
										}}
										sx={{ mt: 3, ml: 1 }}
									>
										Next
									</Button>
								)}
							</Box>
						</React.Fragment>
					)}
				</React.Fragment>
			</Paper>
		</Container>
	);
};

export default EditEmployeeForm;