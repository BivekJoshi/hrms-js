import { Box, Button, Container, Grid, Paper, Step } from '@mui/material';
import { StepLabel, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react';
import EditEmployeeForm from '../../../components/Form/Employee/EmployeeBasicInfoForm/EditEmployeeForm/EditEmployeeForm';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../../auth/hooks/component/login/useAuth';
import { toast } from 'react-toastify'; // Import toast from the library

const EditEmployee = () => {
  // Destructure functions and variables directly
  const { getStepContent, handleNext, steps } = EditEmployeeForm();
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isEmployee } = useAuth();

  const handleBack = () => setActiveStep(activeStep - 1);
  const handleReturn = () => setActiveStep(0);
  const handleSkip = () => setActiveStep(activeStep + 1);

  const handleStepClick = (label) => {
    const stepIndex = steps.indexOf(label);
    setActiveStep(stepIndex);
  };

  const targetRoute = isEmployee
    ? `/employee/viewprofile`
    : `/admin/employee/${id}`;

  const handleSubmit = () => {
    toast.success('Changes submitted successfully');
    navigate(targetRoute);
  };

  return (
    <Grid>
      <Typography component='h1' variant='h4' align='center'>
        Edit Details
      </Typography>
      <Stepper
        activeStep={activeStep}
        variant='elevation'
        sx={{ pt: 3, pb: 5 }}
        alternativeLabel
      >
        {steps?.map((label) => (
          <Step key={label} onClick={() => handleStepClick(label)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography variant='h5' gutterBottom>
            Employee added successfully
          </Typography>
          <Button onClick={handleReturn} sx={{ mt: 3, ml: 1 }}>
            Return
          </Button>
        </>
      ) : (
        <>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {activeStep !== 0 && (
                <Button
                  onClick={handleBack}
                  sx={{ mt: 3, ml: 1, textTransform: 'capitalize' }}
                  variant='outlined'
                >
                  Back
                </Button>
              )}
            </div>
            <div>
              {/* {(activeStep !== 0 || activeStep !== 6) && (
                <Button
                  sx={{ mt: 3, ml: 1, textTransform: 'capitalize' }}
                  variant='outlined'
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )} */}

              {activeStep < 7 && (
                <>
                  <Button
                    variant='contained'
                    onClick={() => handleNext({ activeStep, setActiveStep })}
                    sx={{ mt: 3, ml: 1, textTransform: 'capitalize' }}
                  >
                    Next
                  </Button>
                  <Button
                    sx={{ mt: 3, ml: 1, textTransform: 'capitalize' }}
                    variant='contained'
                    onClick={handleSubmit}
                  >
                    Save and Exit
                  </Button>
                </>
              )}
            </div>
          </Box>
        </>
      )}
    </Grid>
  );
};

export default EditEmployee;
