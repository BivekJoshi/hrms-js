import { Box, Button, Container, Paper, Step } from "@mui/material";
import { StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";
import EditEmployeeForm from "../../../components/Form/Employee/EmployeeBasicInfoForm/EditEmployeeForm/EditEmployeeForm";

const EditEmployee = () => {
  const { getStepContent, handleNext, steps } = EditEmployeeForm();
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReturn = () => {
    setActiveStep(0);
  };

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };

  const handleStepClick = (label) => {
    const stepIndex = steps.indexOf(label);
    setActiveStep(stepIndex);
  };

  return (
    <Container component="main" maxWidth="xlg" sx={{ mt: 5 }}>
      <Paper variant="plain" sx={{ my: { xs: 0, md: 6 }, p: { xs: 0, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Edit Employee
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label} onClick={() => handleStepClick(label)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Employee added successfully
              </Typography>
              <Typography variant="subtitle1">SuccessFul.</Typography>
              <Button onClick={handleReturn} sx={{ mt: 3, ml: 1 }}>
                Return
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1 }}
                    variant="outlined"
                  >
                    Back
                  </Button>
                )}
                {activeStep !== 0 && (
                  <Button
                    sx={{ mt: 3, ml: 1 }}
                    variant="outlined"
                    onClick={handleSkip}
                  >
                    Skip
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Add Employee
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleNext({
                        activeStep,
                        setActiveStep,
                      });
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

export default EditEmployee;
