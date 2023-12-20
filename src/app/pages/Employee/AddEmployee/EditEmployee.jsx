import { Box, Button, Container, Paper, Step } from "@mui/material";
import { StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";
import EditEmployeeForm from "../../../components/Form/Employee/EmployeeBasicInfoForm/EditEmployeeForm/EditEmployeeForm";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../auth/hooks/component/login/useAuth";
import { toast } from "react-toastify"; // Import toast from the library

const EditEmployee = () => {
  const { getStepContent, handleNext, steps } = EditEmployeeForm();
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isEmployee } = useAuth();

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

  const targetRoute = isEmployee
    ? `/employee/viewprofile`
    : `/admin/employee/${id}`;

  const handleSubmit = () => {
    toast.success("Changes submitted successfully");
    navigate(targetRoute);
  };

  return (
    <div>
      <Typography component="h1" variant="h4" align="center">
        Edit Details
      </Typography>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
        {steps?.map((label) => (
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
              {activeStep !== 0 ||
                (activeStep !== 6 && (
                  <Button
                    sx={{ mt: 3, ml: 1 }}
                    variant="outlined"
                    onClick={handleSkip}
                  >
                    Skip
                  </Button>
                ))}
              {activeStep === 6 && (
                <Button
                  sx={{ mt: 3, ml: 1 }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
              {activeStep !== steps.length - 1 && (
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
    </div>
  );
};

export default EditEmployee;
